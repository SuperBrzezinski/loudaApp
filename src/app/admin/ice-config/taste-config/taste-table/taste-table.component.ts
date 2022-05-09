import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-taste-table',
  templateUrl: './taste-table.component.html',
  styleUrls: ['./taste-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteTableComponent implements OnInit {
  tastes$: Observable<string[]> = this.apiService.getTastes();
  displayedColumns: string[] = ['index', 'name', 'action'];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.init();
  }

  removeTaste(tasteName: string) {
    console.log('tasteName: ' + tasteName);

    this.apiService.deleteTaste(tasteName);
  }

  private init() {}
}
