import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothZoomComponent } from './smooth-zoom.component';

describe('SmoothZoomComponent', () => {
  let component: SmoothZoomComponent;
  let fixture: ComponentFixture<SmoothZoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmoothZoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
