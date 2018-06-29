import { TestBed, inject } from '@angular/core/testing';

import { DataLayerService } from './data-layer.service';
import {HttpClientModule} from '@angular/common/http';

describe('DataLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [DataLayerService]
    });
  });

  it('should be created', inject([DataLayerService], (service: DataLayerService) => {
    expect(service).toBeTruthy();
  }));
});
