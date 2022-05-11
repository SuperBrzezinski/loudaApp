import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  tomorrowDate = this.adminService.tomorrowDate;
  constructor(private adminService: AdminService) {}
}
