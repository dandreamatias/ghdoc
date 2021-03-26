import { TestBed } from '@angular/core/testing';

import { GhRepoService } from './gh-repo.service';

describe('GhRepoService', () => {
  let service: GhRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
