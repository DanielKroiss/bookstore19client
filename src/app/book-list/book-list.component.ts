import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Author, Book, Image} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'bs-book-list',
  templateUrl: './book-list.component.html',
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
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bs.getAll().subscribe(res => this.books = res);
  }


}
