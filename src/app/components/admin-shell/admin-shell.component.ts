import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TestapiService } from 'src/app/testapi.service';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShellComponent implements OnInit {
  public isNavbarCollapsed: boolean = false;
  constructor(
    public authService: AuthService,
    public testapi: TestapiService
  ) {}
  ngOnInit(): void {}
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
