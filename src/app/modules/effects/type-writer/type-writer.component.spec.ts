import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeWriterComponent } from './type-writer.component';

describe('TypeWriterComponent', () => {
  let component: TypeWriterComponent;
  let fixture: ComponentFixture<TypeWriterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeWriterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
