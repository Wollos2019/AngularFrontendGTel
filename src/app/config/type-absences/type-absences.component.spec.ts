import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAbsencesComponent } from './type-absences.component';

describe('TypeAbsencesComponent', () => {
  let component: TypeAbsencesComponent;
  let fixture: ComponentFixture<TypeAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAbsencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
