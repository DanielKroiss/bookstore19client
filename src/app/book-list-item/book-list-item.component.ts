import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import { trigger,style,transition,animate,query,stagger } from '@angular/animations';


@Component({
  selector: 'a.bs-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: []
})
export class BookListItemComponent implements OnInit {
  @Input() book: Book;
  constructor() { }

  ngOnInit() {
  }

  changeToComma(value){
    let value1 = value.toFixed(2)
    value1 = value1.toString().replace('.', ',');
    return value1;
  }

}
