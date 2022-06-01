import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrilleProgrammesComponent } from './grille-programmes.component';

describe('GrilleProgrammesComponent', () => {
  let component: GrilleProgrammesComponent;
  let fixture: ComponentFixture<GrilleProgrammesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrilleProgrammesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleProgrammesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
