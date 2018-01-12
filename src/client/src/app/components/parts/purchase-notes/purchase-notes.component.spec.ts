import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseNotesComponent } from './purchase-notes.component';

describe('PurchaseNotesComponent', () => {
  let component: PurchaseNotesComponent;
  let fixture: ComponentFixture<PurchaseNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
