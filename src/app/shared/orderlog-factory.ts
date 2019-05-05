import {Orderlog} from './orderlog';


export class OrderlogFactory {

  static empty(): OrderlogFactory {
    return new Orderlog( null, null, null )
  }


  static fromObject(id, state, order_id): Orderlog {
    return new Orderlog(
      id,
      state,
      order_id
    )
  }
}
