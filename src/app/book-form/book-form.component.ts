import { ActivatedRoute, Router } from '@angular/router';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {debounceTime, distinct, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';


import { BookFormErrorMessages } from './book-form-error-messages';
import {BookFactory} from "../shared/book-factory";
import {BookStoreService} from "../shared/book-store.service";
import {Author, Book, Image} from '../shared/book';
import {BookValidators} from '../shared/book-validators';


@Component({
  selector: 'bs-book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  book = BookFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingBook = false;
  images: FormArray;
  authors: FormArray;
  author1 =[];

  isLoading = true;
  keyup = new EventEmitter<string>();
  foundAuthors: Author[] = [];
  @Output() authorSelected = new EventEmitter<Author>();

  constructor(private fb: FormBuilder, private bs: BookStoreService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.bs.getSingle(isbn).subscribe(book => {
        this.book = book;
        this.initBook();
      });
    }
    this.initBook();

    this.keyup.pipe(debounceTime(500)).pipe(distinctUntilChanged()).
    pipe(switchMap(searchTerm => this.bs.getAuthorsSearch(searchTerm))).
    pipe(tap(() =>this.isLoading = false)).
    subscribe((authors) =>
    {this.foundAuthors = authors;  console.log(this.foundAuthors)
    });

    console.log(this.bookForm)
  }

  searchIt(author1){

   (<HTMLInputElement>document.getElementById("input")).value = author1.firstName+' '+author1.lastName;

    console.log(author1);
    this.author1.push(author1);
    console.log(this.author1);
    (<HTMLInputElement>document.getElementById("res")).style.cssText = 'display:none !important';


  }

  initBook() {
    this.buildThumbnailsArray();

    this.bookForm = this.fb.group({
      id: this.book.id,
      title: [this.book.title, Validators.required],
      subtitle: this.book.subtitle,
      isbn: [this.book.isbn, [
        Validators.required,
        //Validators.minLength(10),
        //Validators.maxLength(13)
        BookValidators.isbnFormat
      ]],
      description: this.book.description,
      //price: [this.book.price, Validators.required,  Validators.pattern(/^[.\d]+$/)],
      price: [this.book.price, Validators.required],
      rating: [this.book.rating,[
        Validators.min(0),
        Validators.max(10)
      ]],
      authors: this.author1,
      images: this.images,
      published: new Date(this.book.published)
    });
    this.bookForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  buildThumbnailsArray() {
    console.log(this.book.images);
    this.images = this.fb.array(
      this.book.images.map(
        t => this.fb.group({
          id: this.fb.control(t.id),
          url: this.fb.control(t.url),
          title: this.fb.control(t.title)
        })
      ), BookValidators.atLeastOneImage
    );
    console.log(this.images);
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({ url: null, title: null }));
  }

  removeThumbnailControl(index){
    this.images.removeAt(index);
  }

  submitForm() {
    // filter empty values
    this.bookForm.value.images = this.bookForm.value.images.filter(thumbnail => thumbnail.url);

    const book: Book = BookFactory.fromObject(this.bookForm.value);
//deep copy  - did not work without??
    book.images = this.bookForm.value.images;

    //just copy the authors
    book.authors = this.author1;
    console.log(book.authors);

    //book.price = this.book.price;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe(res => {
        this.router.navigate(['../../books', book.isbn], { relativeTo: this.route });
      });
    } else {
      book.user_id = 1;// jsut for testing
      console.log(book);
      this.bs.create(book).subscribe(res => {
        this.book = BookFactory.empty();

        this.bookForm.reset(BookFactory.empty());
        this.router.navigate(['../books'], { relativeTo: this.route });
      });
    }
    console.log(book);
    console.log(this.book);
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.bookForm.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
