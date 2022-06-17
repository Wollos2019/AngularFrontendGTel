import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCommandeComponent } from './save-commande.component';

describe('SaveCommandeComponent', () => {
  let component: SaveCommandeComponent;
  let fixture: ComponentFixture<SaveCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
