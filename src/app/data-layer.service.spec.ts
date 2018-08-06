import { TestBed, inject } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('DataLayerService', () => {
  let service: DataLayerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataLayerService]
    });
    service = TestBed.get(DataLayerService);
  });

  it('should be created', inject([DataLayerService], (service: DataLayerService) => {
    expect(service).toBeTruthy();
  }));

  it ('should get faculty stats', () => {
    const dummyResponse = {
        'Engineering': 1,
        'Food and Agri': 2,
        'Some other faculty': 3,
        'Law': 1
      };

    service.getFacStats().then((data) => {
      console.log(data);
    });
  });
});
