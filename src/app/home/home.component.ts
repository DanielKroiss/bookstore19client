import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../shared/book';

@Component({
  selector: 'bs-home',
  template: `
   <div class="ui container">
     <h1>Home</h1>
     <p>Das ist der KWM Bookstore.</p>
     <bs-search class="column" (bookSelected)="bookSelected($event)"></bs-search>
     <a style="margin: 20px" routerLink="../books" class="ui red button">
       Buchliste ansehen
       <i class="right arrow icon"></i>
     </a>
   </div>
 `,
  styles: []
})
export class HomeComponent {
  constructor(private router:Router, private route:ActivatedRoute){}

  bookSelected(book:Book){
    this.router.navigate(['../books', book.isbn], {relativeTo:this.route});
  }
}
