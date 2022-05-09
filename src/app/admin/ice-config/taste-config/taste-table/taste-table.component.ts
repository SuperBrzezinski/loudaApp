import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-taste-table',
  templateUrl: './taste-table.component.html',
  styleUrls: ['./taste-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteTableComponent {
  tastes$: Observable<string[]> = this.apiService.getTastes();
  displayedColumns: string[] = ['index', 'name', 'actions'];
  constructor(private apiService: ApiService) {}

  removeTaste(tasteName: string) {
    this.apiService.deleteTaste(tasteName);
  }
}
