import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRhComponent } from './main-rh.component';

describe('MainRhComponent', () => {
  let component: MainRhComponent;
  let fixture: ComponentFixture<MainRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
