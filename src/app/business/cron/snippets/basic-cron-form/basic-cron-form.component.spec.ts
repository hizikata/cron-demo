import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCronFormComponent } from './basic-cron-form.component';

describe('BasicCronFormComponent', () => {
  let component: BasicCronFormComponent;
  let fixture: ComponentFixture<BasicCronFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCronFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCronFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
