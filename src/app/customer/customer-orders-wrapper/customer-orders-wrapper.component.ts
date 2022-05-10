import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerOrderService } from './customer-order.service';

@Component({
  selector: 'app-customer-orders-wrapper',
  templateUrl: './customer-orders-wrapper.component.html',
  styleUrls: ['./customer-orders-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrdersWrapperComponent implements OnInit {
  tomorrowDate = this.customerOrderService.tomorrowDate;

  public customerLastOrderDate!: string;

  constructor(private customerOrderService: CustomerOrderService) {}

  ngOnInit(): void {
    this.init();
  }

  get isTodaysOrderPlaced() {
    return this.customerLastOrderDate === this.tomorrowDate;
  }

  private init() {
    this.customerOrderService.getCustomerLastOrderDateAsObservable.subscribe(
      (date) => (this.customerLastOrderDate = date)
    );
  }
}
