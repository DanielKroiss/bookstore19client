import {Book} from './book';


export class Order {
  constructor(public id:number, public totalprice:number, public state:number, public user_id:number, public books: Book[], public comment?:string){}

}
