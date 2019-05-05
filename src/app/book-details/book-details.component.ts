import {Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookFactory} from '../shared/book-factory';
import {AuthService} from '../shared/authentication.service';


@Component({
  selector: 'bs-book-details',
  templateUrl: './book-details.component.html',
  styles: []
})
export class BookDetailsComponent implements OnInit {
  savedBooks = [];
  book: Book = BookFactory.empty();
  value: any;
  isAdmin:any;

  constructor(  private  bs: BookStoreService, private route: ActivatedRoute, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bs.getSingle(params['isbn']).subscribe(b => this.book = b);
    this.isAdmin = JSON.parse(localStorage.getItem("isadmin"));

  }

  getRating(num:number){
    return new Array(num);
  }

  removeBook(){
    if(confirm('Buch wirjkich löschen?')){
      this.bs.remove(this.book.isbn).subscribe(
        res => this.router.navigate(['../'], {relativeTo: this.route})
      )
    }
  }

  changeToComma(value){
    this.value = value.toFixed(2)
    this.value = this.value.toString().replace('.', ',');
  }

  save(isbn){
    console.log(this.authService.getCurrentUserId());
    console.log(this.savedBooks);
    if (localStorage.getItem("book_"+this.authService.getCurrentUserId()) != null){
      this.savedBooks =JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));
    }

    this.savedBooks.push(isbn);

    console.log(this.savedBooks);


    localStorage.setItem("book_"+this.authService.getCurrentUserId(), JSON.stringify(this.savedBooks));
  }

  onEvent(value){
    console.log(value)
  }


}
