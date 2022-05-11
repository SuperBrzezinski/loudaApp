import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IceConfigWrapperComponent } from './ice-config-wrapper.component';

describe('IceConfigComponent', () => {
  let component: IceConfigWrapperComponent;
  let fixture: ComponentFixture<IceConfigWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IceConfigWrapperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IceConfigWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
