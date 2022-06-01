import { TestBed } from '@angular/core/testing';

import { ListcommandeService } from './listcommande.service';

describe('ListcommandeService', () => {
  let service: ListcommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
