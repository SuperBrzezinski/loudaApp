import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { map, Observable, take, tap } from 'rxjs';
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

  deleteTaste(tasteToBeDeleted: string) {
    this.db
      .list<string>('ice/tastes')
      .snapshotChanges()
      .pipe(
        take(1),
        map((snapshots) => {
          return snapshots.map((item) => {
            return { key: item.key?.valueOf(), payload: item.payload.val() };
          });
        })
      )
      .subscribe((tastes) => {
        let temp = tastes.filter((element) => {
          if ((element.payload as string) === tasteToBeDeleted) {
            return true;
          } else {
            return false;
          }
        })[0];
        this.db.list('ice/tastes').remove(temp.key);
      });
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

  getFavourites(uid: string): Observable<IceCreamItem[]> {
    return this.db
      .list<IceCreamItem>('users/' + uid + '/favourites')
      .valueChanges();
  }

  getFavourites2(uid: string) {
    return this.db
      .list<IceCreamItem>('users/' + uid + '/favourites')
      .snapshotChanges();
  }

  postFavourite(uid: string, item: IceCreamItem): void {
    this.db.list('users/' + uid + '/favourites/').push(item);
  }

  deleteFavourite(uid: string, itemToBeDeleted: IceCreamItem): void {
    console.log('zaczynam delete');

    this.db
      .list('users/' + uid + '/favourites')
      .snapshotChanges()
      .pipe(
        take(1),
        map((snapshots) => {
          return snapshots.map((item) => {
            return { key: item.key?.valueOf(), payload: item.payload.val() };
          });
        })
      )
      .subscribe((favourites) => {
        let temp = favourites.filter((element) => {
          if (
            (element.payload as IceCreamItem).taste === itemToBeDeleted.taste &&
            (element.payload as IceCreamItem).quantity ===
              itemToBeDeleted.quantity &&
            (element.payload as IceCreamItem).unit === itemToBeDeleted.unit
          ) {
            return true;
          } else {
            return false;
          }
        })[0];
        console.log(temp);
        this.db.list('users/' + uid + '/favourites').remove(temp.key);
      });
  }
}
