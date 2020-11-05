import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentFormatDocComponent } from './moment-format-doc.component';

describe('MomentFormatDocComponent', () => {
  let component: MomentFormatDocComponent;
  let fixture: ComponentFixture<MomentFormatDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentFormatDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentFormatDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
