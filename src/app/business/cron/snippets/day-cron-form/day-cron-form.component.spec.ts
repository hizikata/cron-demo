import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCronFormComponent } from './day-cron-form.component';

describe('DayCronFormComponent', () => {
  let component: DayCronFormComponent;
  let fixture: ComponentFixture<DayCronFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayCronFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCronFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
