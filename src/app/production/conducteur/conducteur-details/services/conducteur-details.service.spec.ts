import { TestBed } from '@angular/core/testing';

import { ConducteurDetailsService } from './conducteur-details.service';

describe('ConducteurDetailsService', () => {
  let service: ConducteurDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConducteurDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
