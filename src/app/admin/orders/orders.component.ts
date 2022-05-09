import { state } from '@angular/animations';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { State, Store } from '@ngrx/store';
import { add, format } from 'date-fns';
import { first, map } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );

  Order: Order = {
    customerName: 'bla',
    items: [{ taste: 'sraka', unit: '250', quantity: '1' }],
  };

  constructor(private apiService: ApiService, private store: Store<AppState>) {}

  ngOnInit(): void {}

  testOrderPost() {
    this.apiService.postOrder(this.Order, this.tomorrowDate);
  }
}
