import { Component } from '@angular/core';
import {Book} from './shared/book';
import {AuthService} from './shared/authentication.service';


@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  //template: `<bs-book-list *ngIf="listOn" (showDetailsEvent)="showDetails($event)"></bs-book-list>
  //<bs-book-details *ngIf="detailsOn" [book]="book" (showListEvent)="showList()"></bs-book-details>`,
  styles: []
})
export class AppComponent {

  constructor(private authService : AuthService){

  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  onEvent(e){
    console.log(e);
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout"
    }
    return "Login"
  }


}
