import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { add, format } from 'date-fns';
import { first } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';
import { selectUserName } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrdersComponent implements OnInit {
  tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );
  customerName!: string;
  constructor(private apiService: ApiService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select(selectUserName)
      .pipe(first())
      .subscribe((name) => {
        this.Order.customerName = name as string;
        console.log(this.customerName);
      });
  }

  Order: Order = {
    customerName: this.customerName,
    items: [
      { taste: 'sraka', unit: '250', quantity: '1' },
      { taste: 'porażka', unit: '330', quantity: '2' },
    ],
  };

  testOrder() {
    this.apiService.postOrder(this.Order, this.tomorrowDate);
  }
}
