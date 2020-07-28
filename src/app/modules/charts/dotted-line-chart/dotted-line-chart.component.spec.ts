import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DottedLineChartComponent } from './dotted-line-chart.component';

describe('DottedLineChartComponent', () => {
  let component: DottedLineChartComponent;
  let fixture: ComponentFixture<DottedLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DottedLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DottedLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
