import { TestBed, inject } from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadService,
        HttpClient,
        HttpHandler
      ]
    });
  });

  it('should be created', inject([UploadService], (service: UploadService) => {
    expect(service).toBeTruthy();
  }));
});
