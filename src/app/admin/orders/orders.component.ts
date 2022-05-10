import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { add, format } from 'date-fns';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  tomorrowDate = format(
    add(new Date(), {
      days: 1,
    }),
    'y-MM-dd'
  );

  constructor() {}
}
