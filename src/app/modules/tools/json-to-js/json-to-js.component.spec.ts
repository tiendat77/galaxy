import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToJsComponent } from './json-to-js.component';

describe('JsonToJsComponent', () => {
  let component: JsonToJsComponent;
  let fixture: ComponentFixture<JsonToJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonToJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonToJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
