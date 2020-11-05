import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LasotuviComponent } from './lasotuvi.component';

describe('LasotuviComponent', () => {
  let component: LasotuviComponent;
  let fixture: ComponentFixture<LasotuviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LasotuviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LasotuviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
