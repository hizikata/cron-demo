import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCronFormComponent } from './week-cron-form.component';

describe('WeekCronFormComponent', () => {
  let component: WeekCronFormComponent;
  let fixture: ComponentFixture<WeekCronFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekCronFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekCronFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
