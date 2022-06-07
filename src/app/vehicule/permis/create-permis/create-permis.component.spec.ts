import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermisComponent } from './create-permis.component';

describe('CreatePermisComponent', () => {
  let component: CreatePermisComponent;
  let fixture: ComponentFixture<CreatePermisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
