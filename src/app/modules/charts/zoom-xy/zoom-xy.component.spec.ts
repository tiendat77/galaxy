import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomXYComponent } from './zoom-xy.component';

describe('ZoomXYComponent', () => {
  let component: ZoomXYComponent;
  let fixture: ComponentFixture<ZoomXYComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomXYComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomXYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
