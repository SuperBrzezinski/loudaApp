import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { add, format } from 'date-fns';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { IceCreamItemSummedUp } from '../shared/models/ice-cream-item-summed-up-model';
import { OrderSummedUp } from '../shared/models/order-summed-up.model';
import { Order } from '../shared/models/order.model';
import {
  ResponseMessage,
  ResponseMessageStatus,
} from '../shared/models/response-message.model';
import { User } from '../shared/models/user.model';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  public readonly tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );

  constructor(
    private apiService: ApiService,
    private afAuth: AngularFireAuth
  ) {}

  private getAllUsers(): Observable<User[]> {
    return this.apiService.getListAsObservable('users');
  }

  public getAllCustomers(): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((userList) => {
        return userList.filter((user) => {
          return user.role === 'customer';
        });
      })
    );
  }

  public newCustomerSignUp(name: string, email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.apiService.postObject(`users/${result.user?.uid}`, {
          name: name,
          email: email,
          role: 'customer',
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  public deleteTaste(tasteToBeDeleted: string) {
    this.apiService
      .getListAsSnapshotActionObservable('ice/tastes')
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
        this.apiService.deleteFromList('ice/tastes', temp.key as string);
      });
  }

  public getTastes(): Observable<string[]> {
    return this.apiService.getListAsObservable(`ice/tastes`);
  }

  public postTaste(tasteName: string): Observable<ResponseMessage> {
    return this.getTastes().pipe(
      switchMap((tastes) => {
        if (tastes.findIndex((element) => element === tasteName) === -1) {
          this.apiService.pushToList('ice/tastes', tasteName);
          return of({
            status: 'Success' as ResponseMessageStatus,
            body: 'Smak dodany!',
          });
        } else {
          return of({
            status: 'Fail' as ResponseMessageStatus,
            body: 'Podany smak już istnieje!',
          });
        }
      }),
      take(1)
    );
  }

  public getUnits(): Observable<string[]> {
    return this.apiService.getListAsObservable('ice/units');
  }

  public deleteUnit(UnitToBeDeleted: string) {
    this.apiService
      .getListAsSnapshotActionObservable('ice/units')
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
          if ((element.payload as string) === UnitToBeDeleted) {
            return true;
          } else {
            return false;
          }
        })[0];
        this.apiService.deleteFromList('ice/units', temp.key as string);
      });
  }

  public postUnit(unitValue: string): Observable<ResponseMessage> {
    return this.getTastes().pipe(
      switchMap((tastes) => {
        if (tastes.findIndex((element) => element === unitValue) === -1) {
          this.apiService.pushToList('ice/units', unitValue);
          return of({
            status: 'Success' as ResponseMessageStatus,
            body: 'Jednostka dodana!',
          });
        } else {
          return of({
            status: 'Fail' as ResponseMessageStatus,
            body: 'Podana jednostka już istnieje!',
          });
        }
      }),
      take(1)
    );
  }

  private getAllOrdersForTomorrowByCustomer() {
    return this.apiService.getListAsObservable<Order>(
      `orders/${this.tomorrowDate}`
    );
  }

  public getAllOrdersForTomorrowByCustomerSummedUp(): Observable<
    OrderSummedUp[]
  > {
    return this.getAllOrdersForTomorrowByCustomer().pipe(
      map((orders) => {
        return orders.map((order) => {
          return {
            customerName: order.customerName,
            items: order.items.map((item) => {
              return {
                taste: item.taste,
                amount: String(Number(item.quantity) * Number(item.unit)),
              };
            }),
          };
        });
      })
    );
  }

  public getAllItemsFromTomorrowOrdersSummedUpByTaste(): Observable<
    IceCreamItemSummedUp[]
  > {
    return this.getAllOrdersForTomorrowByCustomer().pipe(
      map((allOrders) => {
        return allOrders
          .map((order) => {
            return order.items.map((item) => {
              return {
                taste: item.taste,
                amount: String(Number(item.unit) * Number(item.quantity)),
              };
            });
          })
          .flat();
      }),
      map((summedUpItems) => {
        let outputArr: IceCreamItemSummedUp[] = [];
        summedUpItems.forEach((order) => {
          if (
            outputArr.find((element) => {
              return element.taste === order.taste;
            }) !== undefined
          ) {
            outputArr[
              outputArr.findIndex((element) => element.taste === order.taste)
            ].amount = String(
              Number(
                outputArr[
                  outputArr.findIndex(
                    (element) => element.taste === order.taste
                  )
                ].amount
              ) + Number(order.amount)
            );
          } else {
            outputArr.push(order);
          }
        });
        return outputArr;
      })
    );
  }
}
