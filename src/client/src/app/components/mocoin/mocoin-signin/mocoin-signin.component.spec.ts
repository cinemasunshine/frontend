import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoinSigninComponent } from './mocoin-signin.component';

describe('MocoinSigninComponent', () => {
  let component: MocoinSigninComponent;
  let fixture: ComponentFixture<MocoinSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocoinSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocoinSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
