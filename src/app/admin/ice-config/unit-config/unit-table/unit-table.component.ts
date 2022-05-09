import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTableComponent {
  units$: Observable<string[]> = this.apiService.getUnits();
  displayedColumns: string[] = ['index', 'name', 'actions'];

  constructor(private apiService: ApiService) {}

  removeUnit(unit: string) {
    this.apiService.deleteUnit(unit);
  }
}
