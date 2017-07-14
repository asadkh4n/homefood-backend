import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeconfirmationComponent } from './codeconfirmation.component';

describe('CodeconfirmationComponent', () => {
  let component: CodeconfirmationComponent;
  let fixture: ComponentFixture<CodeconfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeconfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
