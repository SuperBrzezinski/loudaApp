import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceConfigComponent } from './ice-config.component';

describe('IceConfigComponent', () => {
  let component: IceConfigComponent;
  let fixture: ComponentFixture<IceConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IceConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
