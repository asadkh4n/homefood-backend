import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GivefeedbackComponent } from './givefeedback.component';

describe('GivefeedbackComponent', () => {
  let component: GivefeedbackComponent;
  let fixture: ComponentFixture<GivefeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GivefeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GivefeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
