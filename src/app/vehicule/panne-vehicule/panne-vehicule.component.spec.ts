import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanneVehiculeComponent } from './panne-vehicule.component';

describe('PanneVehiculeComponent', () => {
  let component: PanneVehiculeComponent;
  let fixture: ComponentFixture<PanneVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanneVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanneVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
