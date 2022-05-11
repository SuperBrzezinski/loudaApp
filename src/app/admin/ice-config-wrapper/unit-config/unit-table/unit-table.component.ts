import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTableComponent {
  units$: Observable<string[]> = this.adminService.getUnits();
  displayedColumns: string[] = ['index', 'name', 'actions'];

  constructor(private adminService: AdminService) {}

  removeUnit(unit: string) {
    this.adminService.deleteUnit(unit);
  }
}
