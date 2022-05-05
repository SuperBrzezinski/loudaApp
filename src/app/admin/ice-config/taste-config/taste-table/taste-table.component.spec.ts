import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteTableComponent } from './taste-table.component';

describe('TasteTableComponent', () => {
  let component: TasteTableComponent;
  let fixture: ComponentFixture<TasteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasteTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
