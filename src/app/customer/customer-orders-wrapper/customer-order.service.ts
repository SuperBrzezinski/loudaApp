import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { add, format } from 'date-fns';
import { map, Observable, take } from 'rxjs';
import { IceCreamItemSummedUp } from 'src/app/shared/models/ice-cream-item-summed-up-model';
import { IceCreamItem } from 'src/app/shared/models/icecreamitem.model';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { lastOrderDateUpdate } from 'src/app/state/user/user.actions';
import {
  selectUserLastOrderDate,
  selectUserName,
  selectUserUid,
} from 'src/app/state/user/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrderService {
  public readonly tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );

  private customerUid!: string;
  private customerName!: string;
  private customerLastOrderDate!: string;
  private customerLastOrderDateAsObservable = this.store.select(
    selectUserLastOrderDate
  );

  //do wyjeb
  // private userLastOrderItemsSummedUp!: IceCreamItemSummedUp[];

  constructor(private apiService: ApiService, private store: Store<AppState>) {
    this.store.select(selectUserUid).subscribe((uid) => {
      this.customerUid = uid as string;
    });

    this.store
      .select(selectUserLastOrderDate)
      .subscribe((date) => (this.customerLastOrderDate = date as string));

    this.store
      .select(selectUserName)
      .pipe(take(1))
      .subscribe((name) => {
        this.customerName = name as string;
      });

    // //do wyjeb
    // this.getUserLastOrderItemsSummedUpAsObservableOnce().subscribe(
    //   (summedUpItems) => (this.userLastOrderItemsSummedUp = summedUpItems)
    // );
  }

  get getCustomerUid() {
    return this.customerUid;
  }

  get getCustomerName() {
    return this.customerName;
  }

  get getCustomerLastOrderDate() {
    return this.customerLastOrderDate;
  }
  get getCustomerLastOrderDateAsObservable() {
    return this.customerLastOrderDateAsObservable as Observable<string>;
  }

  //do wyjeb
  // get getUserLastOrderItemsSummedUp() {
  //   return this.userLastOrderItemsSummedUp;
  // }

  public getFavourites(): Observable<IceCreamItem[]> {
    return this.apiService.getListAsObservable(
      `users/${this.customerUid}/favourites`
    );
  }

  public addToFavourites(item: IceCreamItem): void {
    this.apiService.pushToList(`users/${this.customerUid}/favourites`, item);
  }

  public postOrder(order: Order): void {
    this.apiService.pushToList(`orders/${this.tomorrowDate}/`, order);
    this.postUserLastOrder({ date: this.tomorrowDate, items: order.items });
    this.updateStateCustomerLastOrderDateWithTomorrowDate();
  }

  private postUserLastOrder(order: {
    date: string;
    items: IceCreamItem[];
  }): void {
    this.apiService.postObject(`users/${this.customerUid}/lastOrder/`, order);
  }

  private updateStateCustomerLastOrderDateWithTomorrowDate(): void {
    this.store.dispatch(
      lastOrderDateUpdate({ lastOrderDate: this.tomorrowDate })
    );
  }

  public getUserLastOrderItems(): Observable<IceCreamItem[]> {
    return this.apiService.getListAsObservable(
      `users/${this.customerUid}/lastOrder/items`
    );
  }

  public getUserLastOrderItemsSummedUp(): Observable<IceCreamItemSummedUp[]> {
    return this.getUserLastOrderItems().pipe(
      map((iceCreamItems) => {
        return iceCreamItems.map((iceCreamItem) => {
          return {
            taste: iceCreamItem.taste,
            amount: String(
              Number(iceCreamItem.unit) * Number(iceCreamItem.quantity)
            ),
          };
        });
      })
    );
  }
}
