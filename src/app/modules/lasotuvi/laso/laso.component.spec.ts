import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LasoComponent } from './laso.component';

describe('LasoComponent', () => {
  let component: LasoComponent;
  let fixture: ComponentFixture<LasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
