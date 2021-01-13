import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussianChartComponent } from './gaussian-chart.component';

describe('GaussianChartComponent', () => {
  let component: GaussianChartComponent;
  let fixture: ComponentFixture<GaussianChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaussianChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussianChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
