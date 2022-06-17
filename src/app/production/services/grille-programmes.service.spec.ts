import { TestBed } from '@angular/core/testing';

import { GrilleProgrammesService } from './grille-programmes.service';

describe('GrilleProgrammesService', () => {
  let service: GrilleProgrammesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrilleProgrammesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
