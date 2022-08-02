import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerPanneComponent } from './creer-panne.component';

describe('CreerPanneComponent', () => {
  let component: CreerPanneComponent;
  let fixture: ComponentFixture<CreerPanneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerPanneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerPanneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
