import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetHolderComponent } from './widget-holder.component';

describe('WidgetHolderComponent', () => {
  let component: WidgetHolderComponent;
  let fixture: ComponentFixture<WidgetHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
