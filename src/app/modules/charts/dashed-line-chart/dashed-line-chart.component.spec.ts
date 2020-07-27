import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashedLineChartComponent } from './dashed-line-chart.component';

describe('DashedLineChartComponent', () => {
  let component: DashedLineChartComponent;
  let fixture: ComponentFixture<DashedLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashedLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashedLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
