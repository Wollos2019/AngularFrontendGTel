import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriseVehiculeComponent } from './prise-vehicule.component';

describe('PriseVehiculeComponent', () => {
  let component: PriseVehiculeComponent;
  let fixture: ComponentFixture<PriseVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriseVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriseVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
