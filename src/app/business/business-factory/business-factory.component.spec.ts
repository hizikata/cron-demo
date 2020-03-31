import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessFactoryComponent } from './business-factory.component';

describe('BusinessFactoryComponent', () => {
  let component: BusinessFactoryComponent;
  let fixture: ComponentFixture<BusinessFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
