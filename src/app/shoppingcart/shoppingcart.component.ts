import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {Book} from '../shared/book';
import {AuthService} from '../shared/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BookFactory} from '../shared/book-factory';
import {OrderFactory} from '../shared/order-factory';
import {Order} from '../shared/order';

@Component({
  selector: 'bs-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styles: []
})
export class ShoppingcartComponent implements OnInit {
  storedBooks = [];
  books: Book[];
  array = [];
  test = [];
  viewedBooks = [];
  order = OrderFactory.empty();

  constructor(private bs: BookStoreService,  public authService: AuthService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {

    this.bs.getAll().subscribe(res => this.books = res);
    this.storedBooks = JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));
  }

  deleteFromLocalStorage(isbn){
    this.array = JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));
    localStorage.removeItem('book');
    this.storedBooks = [];

    let removedIndx = this.array.indexOf(isbn);
    while(removedIndx > -1) {
      this.array.splice(removedIndx,1);
      removedIndx = this.array.indexOf(isbn);
    }

    localStorage.setItem("book_"+this.authService.getCurrentUserId(), JSON.stringify(this.array));
    this.storedBooks = this.array;
    this.viewedBooks = [];
  }

  OnEvent(value){
    console.log(value)
  }


  count(isbn){
    this.test = JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));

    let amount = 0;
    for(let i = 0; i < this.test.length; ++i){
      if(this.test[i] == isbn)
        amount++;
    }

    return amount;

  }

  push(isbn){
    this.viewedBooks.push(isbn);
  }

  addBook(isbn){
    this.storedBooks =JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));
    this.storedBooks.push(isbn);
    localStorage.setItem("book_"+this.authService.getCurrentUserId(), JSON.stringify(this.storedBooks));
    this.viewedBooks = [];
  }

  removeBook(isbn){
    for(let i =0; i < this.storedBooks.length; i++){
      if(this.storedBooks[i]==isbn){
        this.storedBooks.splice(i,1);
        localStorage.setItem("book_"+this.authService.getCurrentUserId(), JSON.stringify(this.storedBooks));
        this.viewedBooks = [];
        break;
      }
    }
  }

  isLoggedIn(){
    console.log(this.authService.isLoggedIn());
    if(this.authService.isLoggedIn()){
      this.save();
    }else{
      this.router.navigate(['/login'])

    }
  }

  save(){
    this.storedBooks = JSON.parse(localStorage.getItem("book_"+this.authService.getCurrentUserId()));

    let price = 0;
    let books = [];

    for(let i =0; i< this.books.length; i++){
      for (let j =0; j < this.storedBooks.length; j++){
        if(this.books[i].isbn == this.storedBooks[j]){
          price += this.books[i].price;
          books.push(this.books[i]);
        }
      }
    }

    const order: Order = OrderFactory.fromObject(null,price,1,this.authService.getCurrentUserId(), books,'');
    console.log(order);
    this.bs.createOrder(order).subscribe(res => {
      this.order = OrderFactory.empty();
      localStorage.removeItem("book_"+this.authService.getCurrentUserId());
      this.router.navigate(['../ordering'], { relativeTo: this.route });
    });
  }

}


