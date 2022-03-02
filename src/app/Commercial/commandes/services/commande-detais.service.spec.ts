import { TestBed } from '@angular/core/testing';

import { CommandeDetaisService } from './commande-detais.service';

describe('CommandeDetaisService', () => {
  let service: CommandeDetaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeDetaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
