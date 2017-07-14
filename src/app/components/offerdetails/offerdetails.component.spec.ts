import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferdetailsComponent } from './offerdetails.component';

describe('OfferdetailsComponent', () => {
  let component: OfferdetailsComponent;
  let fixture: ComponentFixture<OfferdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
