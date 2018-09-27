import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OocxNgComponent } from './oocx-ng.component';

describe('OocxNgComponent', () => {
  let component: OocxNgComponent;
  let fixture: ComponentFixture<OocxNgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OocxNgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OocxNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
