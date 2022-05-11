import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerWrapperComponent } from './admin-customer-wrapper';

describe('CustomersListComponent', () => {
  let component: AdminCustomerWrapperComponent;
  let fixture: ComponentFixture<AdminCustomerWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCustomerWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
