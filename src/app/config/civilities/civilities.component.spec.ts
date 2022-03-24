import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CivilitiesComponent} from './civilities.component';

describe('CivilitiesComponent', () => {
  let component: CivilitiesComponent;
  let fixture: ComponentFixture<CivilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CivilitiesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
