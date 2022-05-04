import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { CustomersListService } from '../customers-list.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerTableComponent implements OnInit {
  public customers!: User[];
  displayedColumns: string[] = ['index', 'name', 'email'];
  constructor(
    private customerListService: CustomersListService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.customerListService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this.changeDetectorRef.markForCheck();
    });
  }
}
