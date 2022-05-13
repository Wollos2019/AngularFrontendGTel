import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriePermisComponent } from './categorie-permis.component';

describe('CategoriePermisComponent', () => {
  let component: CategoriePermisComponent;
  let fixture: ComponentFixture<CategoriePermisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriePermisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriePermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
