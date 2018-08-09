import { TestBed, inject } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

describe('DataLayerService', () => {
  let service: DataLayerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataLayerService]
    });
    service = TestBed.get(DataLayerService);
  });
  it('should be created', inject([DataLayerService], (tempService: DataLayerService) => {
    expect(tempService).toBeTruthy();
  }));
});

describe('DataLayerService (with spies)', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let data: DataLayerService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    data = new DataLayerService(<any>httpClientSpy);
  });

  it('should return faculty names in a Promise (getFacultyNames)', () => {
    const expectedNames = {
      'faculty abbr': 'faculty full name',
      'fac': 'faculty',
      'fac_abbr': 'faculty full'
    };

    httpClientSpy.get.and.returnValue(expectedNames);
    const returnData = data.getFacultyNames();
    expect(returnData).toEqual(jasmine.any(Promise));
    returnData.then(names => {
      expect(names).toEqual(expectedNames);
      expect(Object.keys(names))[0].toEqual(jasmine.any(String));
      expect(Object.values(names))[0].toEqual(jasmine.any(String));
    });

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return faculty statistics in a promise (getFacStats)', () => {
    const expectedStats = {
      'fac1': 12,
      'fac2': 24,
      'fac3': 50,
      'fac4': 12
    };

    httpClientSpy.get.and.returnValue(expectedStats);
    const returnData = data.getFacStats();
    expect(returnData).toEqual(jasmine.any(Promise));
    returnData.then(stats => {
      expect(stats).toEqual(expectedStats);
      expect(Object.keys(stats)[0]).toEqual(jasmine.any(String));
      expect(Object.values(stats)[0]).toEqual(jasmine.any(Number));
    });
  });

  it('should return all subjects in a promise (getSubjects)', () => {
    const expectedSubs = [
      {'name': 'sub1 (CAPE)', 'level': 'CAPE'},
      {'name': 'sub2 (CSEC)', 'level': 'CSEC'}
    ];

    httpClientSpy.get.and.returnValue(expectedSubs);
    const returnData = data.getSubjects();
    expect(returnData).toEqual(jasmine.any(Promise));
    returnData.then(subs => {
      expect(subs).toEqual(expectedSubs);
      expect(subs[0]['name']).toBeTruthy();
      expect(subs[0]['level']).toBeTruthy();
      expect(subs[0]['name'].includes('(CAPE)') || subs[0]['name'].includes('(CSEC)')).toBe(true);
      expect(subs[0]['level'] === 'CAPE' || subs[0]['level'] === 'CSEC').toBe(true);
    });
  });
});
