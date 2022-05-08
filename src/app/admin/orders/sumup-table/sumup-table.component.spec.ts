import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumupTableComponent } from './sumup-table.component';

describe('SumupTableComponent', () => {
  let component: SumupTableComponent;
  let fixture: ComponentFixture<SumupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumupTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SumupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
