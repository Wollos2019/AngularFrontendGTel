import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueVehiculeComponent } from './statistique-vehicule.component';

describe('StatistiqueVehiculeComponent', () => {
  let component: StatistiqueVehiculeComponent;
  let fixture: ComponentFixture<StatistiqueVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiqueVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
