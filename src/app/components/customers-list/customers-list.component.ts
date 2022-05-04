import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { CustomersListService } from './customers-list.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent implements OnInit {
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
