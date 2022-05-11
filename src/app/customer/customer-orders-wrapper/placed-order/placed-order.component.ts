import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-placed-order',
  templateUrl: './placed-order.component.html',
  styleUrls: ['./placed-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacedOrderComponent {
  customerLastOrderItems$ =
    this.customerService.getUserLastOrderItemsSummedUp();

  constructor(private customerService: CustomerService) {}
}
