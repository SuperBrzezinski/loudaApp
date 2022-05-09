import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { CustomersListService } from '../customers-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent {
  customers$: Observable<User[]> = this.customerListService.getCustomers();
  displayedColumns: string[] = ['index', 'name', 'email'];

  constructor(private customerListService: CustomersListService) {}
}
