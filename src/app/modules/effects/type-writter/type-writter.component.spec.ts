import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWritterComponent } from './type-writter.component';

describe('TypeWritterComponent', () => {
  let component: TypeWritterComponent;
  let fixture: ComponentFixture<TypeWritterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeWritterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeWritterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
