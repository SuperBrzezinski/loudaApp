import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { IceCreamItem } from '../models/icecreamitem.model';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private db: AngularFireDatabase) {}

  getUser(uid: string): Observable<User> {
    return this.db
      .object<User>('users/' + uid)
      .valueChanges() as Observable<User>;
  }

  getUsers(): Observable<User[]> {
    return this.db.list<User>('users').valueChanges();
  }

  postUser(uid: string, user: User) {
    this.db.object('users/' + uid).set(user);
  }

  getUserLastOrderItems(uid: string): Observable<IceCreamItem[]> {
    return this.db
      .list<IceCreamItem>(`users/${uid}/lastOrder/items`)
      .valueChanges();
  }

  postUserLastOrder(
    uid: string,
    order: { date: string; items: IceCreamItem[] }
  ) {
    this.db.object('users/' + uid + '/lastOrder').set(order);
  }

  getTastes(): Observable<string[]> {
    return this.db.list<string>('ice/tastes').valueChanges();
  }

  postTaste(tasteName: string) {
    this.db.list<string>('ice/tastes').push(tasteName);
  }

  getUnits(): Observable<string[]> {
    return this.db.list<string>('ice/units').valueChanges();
  }

  postUnit(unitValue: string) {
    this.db.list<string>('ice/units').push(unitValue);
  }

  getOrders(date: string): Observable<Order[]> {
    return this.db.list<Order>('orders/' + date).valueChanges();
  }

  postOrder(order: Order, date: string) {
    this.db.list('orders/' + date + '/').push(order);
  }

  postFavourite(uid: string, item: IceCreamItem): void {
    this.db.list('users/' + uid + '/favourites/').push(item);
  }
}
