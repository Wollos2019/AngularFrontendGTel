import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityMesureComponent } from './unity-mesure.component';

describe('UnityMesureComponent', () => {
  let component: UnityMesureComponent;
  let fixture: ComponentFixture<UnityMesureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityMesureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
