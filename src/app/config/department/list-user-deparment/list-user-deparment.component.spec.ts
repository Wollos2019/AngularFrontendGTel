import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserDeparmentComponent } from './list-user-deparment.component';

describe('ListUserDeparmentComponent', () => {
  let component: ListUserDeparmentComponent;
  let fixture: ComponentFixture<ListUserDeparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserDeparmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserDeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
