import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent {
  customers$ = this.adminService.getAllCustomers();
  displayedColumns: string[] = ['index', 'name', 'email'];

  constructor(private adminService: AdminService) {}
}
