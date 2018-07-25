import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoinInputComponent } from './mocoin-input.component';

describe('MocoinInputComponent', () => {
  let component: MocoinInputComponent;
  let fixture: ComponentFixture<MocoinInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocoinInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocoinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
