import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddTasteComponent } from './dialog-add-taste.component';

describe('DialogAddTasteComponent', () => {
  let component: DialogAddTasteComponent;
  let fixture: ComponentFixture<DialogAddTasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddTasteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddTasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
