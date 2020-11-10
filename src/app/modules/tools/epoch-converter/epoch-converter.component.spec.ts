import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpochConverterComponent } from './epoch-converter.component';

describe('EpochConverterComponent', () => {
  let component: EpochConverterComponent;
  let fixture: ComponentFixture<EpochConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
