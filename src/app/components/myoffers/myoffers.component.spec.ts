import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyoffersComponent } from './myoffers.component';

describe('MyoffersComponent', () => {
  let component: MyoffersComponent;
  let fixture: ComponentFixture<MyoffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyoffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
