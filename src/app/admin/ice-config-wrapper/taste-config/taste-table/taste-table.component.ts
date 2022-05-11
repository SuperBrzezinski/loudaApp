import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/admin/admin.service';

@Component({
  selector: 'app-taste-table',
  templateUrl: './taste-table.component.html',
  styleUrls: ['./taste-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasteTableComponent {
  tastes$: Observable<string[]> = this.adminService.getTastes();
  displayedColumns: string[] = ['index', 'name', 'actions'];
  constructor(private adminService: AdminService) {}

  removeTaste(tasteName: string) {
    this.adminService.deleteTaste(tasteName);
  }
}
