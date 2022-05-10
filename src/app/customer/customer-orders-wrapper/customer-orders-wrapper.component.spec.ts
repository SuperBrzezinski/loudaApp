import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersWrapperComponent } from './customer-orders-wrapper.component';

describe('CustomerOrdersComponent', () => {
  let component: CustomerOrdersWrapperComponent;
  let fixture: ComponentFixture<CustomerOrdersWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOrdersWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
