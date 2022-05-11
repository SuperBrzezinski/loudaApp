import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { IceCreamItem } from '../models/icecreamitem.model';
import { Order } from '../models/order.model';
import {
  ResponseMessage,
  ResponseMessageStatus,
} from '../models/response-message.model';
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

  // getUsers(): Observable<User[]> {
  //   return this.db.list<User>('users').valueChanges();
  // }

  // postUser(uid: string, user: User) {
  //   this.db.object('users/' + uid).set(user);
  // }

  //powoli mozemy sie tego pozbywac - jeszcze nie
  // getTastes(): Observable<string[]> {
  //   return this.db.list<string>('ice/tastes').valueChanges();
  // }

  // postTaste(tasteName: string): Observable<ResponseMessage> {
  //   return this.getTastes().pipe(
  //     switchMap((tastes) => {
  //       if (tastes.findIndex((element) => element === tasteName) === -1) {
  //         this.db.list<string>('ice/tastes').push(tasteName);
  //         return of({
  //           status: 'Success' as ResponseMessageStatus,
  //           body: 'Smak dodany!',
  //         });
  //       } else {
  //         return of({
  //           status: 'Fail' as ResponseMessageStatus,
  //           body: 'Podany smak już istnieje!',
  //         });
  //       }
  //     }),
  //     take(1)
  //   );
  // }

  // do wyjeb jak skoncze
  // deleteTaste(tasteToBeDeleted: string) {
  //   this.db
  //     .list<string>('ice/tastes')
  //     .snapshotChanges()
  //     .pipe(
  //       take(1),
  //       map((snapshots) => {
  //         return snapshots.map((item) => {
  //           return { key: item.key?.valueOf(), payload: item.payload.val() };
  //         });
  //       })
  //     )
  //     .subscribe((tastes) => {
  //       let temp = tastes.filter((element) => {
  //         if ((element.payload as string) === tasteToBeDeleted) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       })[0];
  //       this.db.list('ice/tastes').remove(temp.key);
  //     });
  // }

  // getUnits(): Observable<string[]> {
  //   return this.db.list<string>('ice/units').valueChanges();
  // }

  // postUnit(unitValue: string): Observable<ResponseMessage> {
  //   return this.getUnits().pipe(
  //     switchMap((units) => {
  //       if (units.findIndex((element) => element === unitValue) === -1) {
  //         this.db.list<string>('ice/units').push(unitValue);
  //         return of({
  //           status: 'Success' as ResponseMessageStatus,
  //           body: 'Jednostka dodana!',
  //         });
  //       } else {
  //         return of({
  //           status: 'Fail' as ResponseMessageStatus,
  //           body: 'Podana jednostka już istnieje!',
  //         });
  //       }
  //     }),
  //     take(1)
  //   );
  // }

  // deleteUnit(unitToBeDeleted: string) {
  //   this.db
  //     .list<string>('ice/units')
  //     .snapshotChanges()
  //     .pipe(
  //       take(1),
  //       map((snapshots) => {
  //         return snapshots.map((item) => {
  //           return { key: item.key?.valueOf(), payload: item.payload.val() };
  //         });
  //       })
  //     )
  //     .subscribe((tastes) => {
  //       let temp = tastes.filter((element) => {
  //         if ((element.payload as string) === unitToBeDeleted) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       })[0];
  //       this.db.list('ice/units').remove(temp.key);
  //     });
  // }

  // getOrders(date: string): Observable<Order[]> {
  //   return this.db.list<Order>('orders/' + date).valueChanges();
  // }

  getListAsObservable<T>(path: string): Observable<T[]> {
    return this.db.list<T>(path).valueChanges();
  }

  getListAsSnapshotActionObservable<T>(
    path: string
  ): Observable<SnapshotAction<T>[]> {
    return this.db.list<T>(path).snapshotChanges();
  }

  pushToList<T>(path: string, itemToPush: T): void {
    this.db.list(path).push(itemToPush);
  }

  postObject<T>(path: string, objectToPost: T): void {
    this.db.object(path).set(objectToPost);
  }

  deleteFromList(path: string, key: string): void {
    this.db.list(path).remove(key);
  }
}
