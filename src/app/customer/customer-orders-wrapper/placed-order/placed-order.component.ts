import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomerOrderService } from '../customer-order.service';

@Component({
  selector: 'app-placed-order',
  templateUrl: './placed-order.component.html',
  styleUrls: ['./placed-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacedOrderComponent {
  customerLastOrderItems$ =
    this.customerOrderService.getUserLastOrderItemsSummedUp();

  constructor(private customerOrderService: CustomerOrderService) {}
}
