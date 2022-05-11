import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-sumup-table',
  templateUrl: './sumup-table.component.html',
  styleUrls: ['./sumup-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SumupTableComponent {
  tomorrowDate = this.adminService.tomorrowDate;
  summedUpOrders$ =
    this.adminService.getAllItemsFromTomorrowOrdersSummedUpByTaste();
  displayedColumns: string[] = ['index', 'taste', 'amount'];

  constructor(private adminService: AdminService) {}
}
