import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTableComponent implements OnInit {
  public units!: string[];
  displayedColumns: string[] = ['index', 'name'];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.apiService.getUnits().subscribe((units) => {
      this.units = units;
      this.changeDetectorRef.markForCheck();
    });
  }
}
