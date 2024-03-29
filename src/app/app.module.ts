import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import {BookStoreService} from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BookFormComponent } from './book-form/book-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { SearchComponent } from './search/search.component';
import {DateValueAccessorModule} from 'angular-date-value-accessor';
import { LoginComponent } from './login/login.component';
import {AuthService} from './shared/authentication.service';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import {TokenInterceptorService} from './shared/token-interceptor.service';
import {JwtInterceptorService} from './shared/jwt-interceptor.service';
import { OrederingComponent } from './oredering/oredering.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    BookFormComponent,
    SearchComponent,
    LoginComponent,
    ShoppingcartComponent,
    OrederingComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, DateValueAccessorModule, FormsModule, BrowserAnimationsModule
  ],
  providers: [BookStoreService, AuthService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
