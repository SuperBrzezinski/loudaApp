import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUnitComponent } from './dialog-add-unit.component';

describe('DialogAddUnitComponent', () => {
  let component: DialogAddUnitComponent;
  let fixture: ComponentFixture<DialogAddUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
