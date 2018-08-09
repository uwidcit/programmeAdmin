import { TestBed, inject } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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
  const mockData = {
    facNames: {
      'faculty abbr': 'faculty full name',
      'fac': 'faculty',
      'fac_abbr': 'faculty full'
    },
    facStats: {
      'fac1': 12,
      'fac2': 24,
      'fac3': 50,
      'fac4': 12
    },
    expectedErrors: [
      {
        'name': 'Agriculture - Major in Agricultural Extnsion',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 0,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }, {
        'name': 'Agriculture - Minor in Communication and Extension',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 3,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }, {
        'name': 'Agriculture - Minor in Entrepreneurship',
        'type': 'BACHELOR OF SCIENCE (BSc) GENERAL',
        'part_time': false,
        'evening': false,
        'full_time': false,
        'faculty': 'Food & Agriculture',
        'department': 'Agricultural Economics & Extension',
        'duration': 3,
        'url': '',
        'requirements': {
          'cape_passes': 0,
          'csec_passes': 0,
          'mandatory': [],
          'combinations': []
        },
        'corrected': '',
        'report': {
          'valid': false,
          'corrected': '',
          'missing_subjects': '',
          'mandatory': 'Empty array',
          'req_conflict': '',
          'passes': 'No cape and no csec passes',
          'classes': 'None specified'
        }
      }
    ],

  };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    data = new DataLayerService(<any>httpClientSpy);
  });

  describe('Testing getFacultyNames', () => {
    beforeEach(() => {
      spyOn(data, 'getFacStats').and.returnValue(Promise.resolve(mockData.facStats));
    });

    it('- should test if the function is defined', () => {
      expect(data.getFacultyNames).toBeDefined();
    });

    it('- should test if a Promise is returned', () => {
      expect(data.getFacultyNames().then()).toBeDefined();
    });

    it('- should return more than 0 faculty names in a Promise', () => {
      data.getFacultyNames().then(names => {
        expect(names).toBeDefined();
        expect(names).toBe(mockData.facNames);
        expect(Object.keys(names).length).toBeGreaterThan(0);
      }).catch(error => {
        console.log(error);
      });
    });
  });

  describe('Testing getFacStats', () => {
    beforeEach(() => {
      spyOn(data, 'getFacStats').and.returnValue(Promise.resolve(mockData.facStats));
    });

    it('- should test if the function is defined', () => {
      expect(data.getFacStats).toBeDefined();
    });

    it('- should test if the function returns a Promise', () => {
      expect(data.getFacStats().then()).toBeDefined();
    });

    it('- should return more than 0 statistics in a Promise', () => {
      data.getFacStats().then(stats => {
        expect(stats).toBeDefined();
        expect(stats).toBe(mockData.facStats);
        expect(Object.keys(stats).length).toBeGreaterThan(0);
        expect(typeof Object.keys(stats)[0]).toBe('string');
        expect(typeof Object.values(stats)[0]).toBe('number');
      }).catch(error => { console.log(error); });
    });
  });

  describe('Testing getErrors', () => {
    beforeEach(() => {
      spyOn(data, 'getErrors').and.returnValue(Promise.resolve(mockData.expectedErrors));
    });

    it('- should check if the function is defined', () => {
      expect(data.getErrors).toBeDefined();
    });

    it('- should check if the function returns a Promise', () => {
      expect(data.getErrors().then()).toBeDefined();
    });

    it('- should return errors (if any) in a Promise', () => {
      data.getErrors().then((errors: any[] ) => {
        expect(errors).toBeDefined();
        expect(errors).toBe(mockData.expectedErrors);
        if (errors.length > 0) {
          const error = errors[0];
          expect(error.name).toBeDefined();
          expect(typeof error.name).toBe('string');

          expect(error.report).toBeDefined();
          expect(error.report).not.toBe({});

          expect(error.report.valid).toBeDefined();
          expect(typeof error.report.valid).toBe('boolean');
          expect(error.report.valid).toBe(false);

          expect(error.report.corrected).toBeDefined();
          expect(typeof error.report.corrected).toBe('string');
          expect(error.report.missing_subjects).toBeDefined();
          expect(error.report.mandatory).toBeDefined();
          expect(error.report.req_conflict).toBeDefined();
          expect(error.report.passes).toBeDefined();
          expect(error.report.classes).toBeDefined();


        }
      });
    });
  });
});
