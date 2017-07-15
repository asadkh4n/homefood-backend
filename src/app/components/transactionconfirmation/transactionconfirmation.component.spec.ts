import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfirmationComponent } from './transactionconfirmation.component';

describe('TransactionConfirmationComponent', () => {
  let component: TransactionConfirmationComponent;
  let fixture: ComponentFixture<TransactionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
