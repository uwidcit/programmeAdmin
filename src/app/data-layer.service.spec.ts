import { TestBed, inject } from '@angular/core/testing';

import { DataLayerService } from './data-layer.service';

describe('DataLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataLayerService]
    });
  });

  it('should be created', inject([DataLayerService], (service: DataLayerService) => {
    expect(service).toBeTruthy();
  }));
});
