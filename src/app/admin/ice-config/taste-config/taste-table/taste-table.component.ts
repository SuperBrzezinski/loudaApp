import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-taste-table',
  templateUrl: './taste-table.component.html',
  styleUrls: ['./taste-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteTableComponent implements OnInit {
  public tastes!: string[];
  displayedColumns: string[] = ['index', 'name'];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.apiService.getTastes().subscribe((tastes) => {
      this.tastes = tastes;
      this.changeDetectorRef.markForCheck();
    });
  }
}
