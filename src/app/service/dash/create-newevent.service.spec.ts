import { TestBed } from '@angular/core/testing';

import { CreateNeweventService } from './create-newevent.service';

describe('CreateNeweventService', () => {
  let service: CreateNeweventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNeweventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
