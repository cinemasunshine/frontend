import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoinSignoutComponent } from './mocoin-signout.component';

describe('MocoinSignoutComponent', () => {
  let component: MocoinSignoutComponent;
  let fixture: ComponentFixture<MocoinSignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocoinSignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocoinSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
