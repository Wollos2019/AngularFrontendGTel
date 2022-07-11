import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCarburantComponent } from './type-carburant.component';

describe('TypeCarburantComponent', () => {
  let component: TypeCarburantComponent;
  let fixture: ComponentFixture<TypeCarburantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCarburantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
