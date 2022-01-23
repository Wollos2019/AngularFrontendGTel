import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggoutComponent } from './loggout.component';

describe('LoggoutComponent', () => {
  let component: LoggoutComponent;
  let fixture: ComponentFixture<LoggoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
