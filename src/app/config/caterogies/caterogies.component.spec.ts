import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CaterogiesComponent} from './caterogies.component';

describe('CaterogiesComponent', () => {
  let component: CaterogiesComponent;
  let fixture: ComponentFixture<CaterogiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaterogiesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterogiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
