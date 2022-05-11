import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasteConfigComponent } from './taste-config.component';

describe('TasteConfigComponent', () => {
  let component: TasteConfigComponent;
  let fixture: ComponentFixture<TasteConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasteConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasteConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
