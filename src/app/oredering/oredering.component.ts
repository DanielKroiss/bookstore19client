import { Component, OnInit } from '@angular/core';
import {BookStoreService} from '../shared/book-store.service';
import {AuthService} from '../shared/authentication.service';
import * as $ from 'jquery';
import {Order} from '../shared/order';
import {OrderFactory} from '../shared/order-factory';
import {Orderlog} from '../shared/orderlog';
import {OrderlogFactory} from '../shared/orderlog-factory';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'bs-oredering',
  templateUrl: './oredering.component.html',
  styles: [],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class OrederingComponent implements OnInit {
  orders = [];
  viewedBooks = [];
  currentUser: any;
  isAdmin: any;
  netPrice: any;
  orderlog = OrderlogFactory.empty();
  commentValue: any;


  constructor(private bs: BookStoreService, private authservice: AuthService, ) {
  }

  ngOnInit() {
    this.bs.getOrders().subscribe(res => this.orders = res);
    this.currentUser = this.authservice.getCurrentUserId();
    this.isAdmin = JSON.parse(localStorage.getItem("isadmin"));



  }

  push(isbn){
    this.viewedBooks.push(isbn);
  }

  clear(){
    this.viewedBooks = [];
  }

  count(books, isbn){
    let amount = 0;
    for(let i = 0; i < books.length; ++i){
      if(books[i].isbn == isbn)
        amount++;
    }

    return amount;
  }
  
  getState(state){
    switch (state) {
      case 1:
        return "Offen";
        break;
      case 2:
        return "Bezahlt"
        break;
      case 3:
        return "Versendet"
        break;
      case 4:
        return "Storniert"
        break;
      default:
        return "in Bearbeitung"
        break;
    }
  }

  onChange(event, order): void {  // event will give you full brief of action
    let newState;

    switch (event) {
      case "Offen":
          newState =1;
        break;
      case "Bezahlt":
        newState =2;
        break;
      case "Versendet":
        newState =3;
        break;
      case "Storniert":
        newState =4;
        break;
      default:
        newState =1;
        break;
    }

    console.log(newState);
    //const orderlog: Orderlog = OrderlogFactory.fromObject(null, event, 1);
    order.state = newState;
    console.log(order);
    //this.bs.updateState(order).subscribe(res => {order});
  }

  getNetPrice(grossPrice) {
    return (this.netPrice = grossPrice / 100 * 90).toFixed(2);

  }

  changeState(comment, order): void {
    console.log(comment);
    order.comment = comment;
    console.log('in');
    this.bs.updateState(order).subscribe(res => {
    });
    location.reload();
  }

  onEvent(order){
    console.log(order)
  }
  
}

