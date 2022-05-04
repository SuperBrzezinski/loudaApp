import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-shell',
  templateUrl: './customer-shell.component.html',
  styleUrls: ['./customer-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerShellComponent implements OnInit {
  public isNavbarCollapsed: boolean = false;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
