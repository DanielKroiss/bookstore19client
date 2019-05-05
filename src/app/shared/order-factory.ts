
import {Order} from './order';

export class OrderFactory {

  static empty(): Order {
    return new Order(null, null, null, null, [], '')
  }

 /* static fromObject(rawOrder: any): Order {
    return new Order(
      rawOrder.id,
      rawOrder.totalprice,
      rawOrder.state,
      rawOrder.user_id,
      rawOrder.comment
    );
  }
  */
  static fromObject(id, totalprice, state, user_id, books, comment): Order {
    return new Order(
      id,
      totalprice,
      state,
      user_id,
      books,
      comment
    );
  }
}
