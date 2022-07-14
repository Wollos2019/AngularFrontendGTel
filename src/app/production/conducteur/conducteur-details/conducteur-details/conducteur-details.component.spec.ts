import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConducteurDetailsComponent } from './conducteur-details.component';

describe('ConducteurDetailsComponent', () => {
  let component: ConducteurDetailsComponent;
  let fixture: ComponentFixture<ConducteurDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConducteurDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConducteurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
