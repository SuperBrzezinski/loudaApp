import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-orders-wrapper',
  templateUrl: './customer-orders-wrapper.component.html',
  styleUrls: ['./customer-orders-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerOrdersWrapperComponent implements OnInit {
  tomorrowDate = this.customerService.tomorrowDate;

  public customerLastOrderDate!: string;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.init();
  }

  get isTodaysOrderPlaced() {
    return this.customerLastOrderDate === this.tomorrowDate;
  }

  private init() {
    this.customerService.getCustomerLastOrderDateAsObservable.subscribe(
      (date) => (this.customerLastOrderDate = date)
    );
  }
}
