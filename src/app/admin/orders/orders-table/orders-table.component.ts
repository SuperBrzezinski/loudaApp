import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { map } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { ApiService } from 'src/app/shared/services/api.service';

interface OrderByCustomer {
  customerName: string;
  items: {
    taste: string;
    amount: string;
  }[];
}

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit {
  public orders!: OrderByCustomer[];
  @Input() tomorrowDate!: string;
  displayedColumns: string[] = ['index', 'name', 'order'];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.apiService
      .getOrders(this.tomorrowDate)
      .pipe(
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
      )
      .subscribe((orders) => {
        this.orders = orders;
        this.changeDetectorRef.markForCheck();
      });
  }
}