import { TestBed, inject } from '@angular/core/testing';
import { DataLayerService } from './data-layer.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const mockData = require('./mock/data.service.json');

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

    it('- should test if the function returns more than 0 statistics in a Promise', () => {
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

    it('- should test if the function is defined', () => {
      expect(data.getErrors).toBeDefined();
    });

    it('- should test if the function returns a Promise', () => {
      expect(data.getErrors().then()).toBeDefined();
    });

    it('- should test if errors (if any) are returned in a Promise', () => {
      data.getErrors().then((errors: any[] ) => {
        expect(errors).toBeDefined();
        expect(errors).toBe(mockData.expectedErrors);
        if (errors.length > 0) {
          const error = errors[0];
          expect(error.name).toBeDefined();
          expect(error.report).toBeDefined();
          expect(error.report.valid).toBeDefined();
          expect(error.report.corrected).toBeDefined();
          expect(error.report.missing_subjects).toBeDefined();
          expect(error.report.mandatory).toBeDefined();
          expect(error.report.req_conflict).toBeDefined();
          expect(error.report.passes).toBeDefined();
          expect(error.report.classes).toBeDefined();

          expect(typeof error.name).toBe('string');
          expect(typeof error.report).toBe('object');
          expect(typeof error.report.valid).toBe('boolean');
          expect(typeof error.report.corrected).toBe('string');
          expect(typeof error.report.missing_subjects).toBe('string');
          expect(typeof error.report.mandatory).toBe('string');
          expect(typeof error.report.req_conflict).toBe('string');
          expect(typeof error.report.passes).toBe('string');
          expect(typeof error.report.classes).toBe('string');

          expect(error.report.valid).toBe(false);
          expect(error.report).not.toBe({});

        }
      });
    });
  });

  describe('Testing getProgsByFaculty', () => {
    beforeEach(() => {
    });

    it('- should test if the function is defined', () => {
      expect(data.getProgsByFaculty).toBeDefined();
    });

    it('- should test if the function returns a Promise', () => {
      expect(data.getProgsByFaculty('fac1').then()).toBeDefined();
    });

    it('- should test if programmes are returned in the Promise', () => {
      spyOn(data, 'getProgsByFaculty').and.returnValue(Promise.resolve(mockData.faculty.fac1));

      data.getProgsByFaculty('fac1').then((progs: any[]) => {
        expect(progs).toBeDefined();
        expect(progs.length).toBeGreaterThan(0);
        expect(progs).toBe(mockData.faculty.fac1);
      });
    });

    it('- should test if no programmes are returned for an invalid faculty name', () => {
      spyOn(data, 'getProgsByFaculty').and.returnValue(Promise.resolve([]));
      data.getProgsByFaculty('invalid_fac').then((progs: any[]) => {
        expect(progs).toBeDefined();
        expect(progs.length).toBe(0);
      });
    });
  });

  describe('Testing getAllProgs', () => {
    beforeEach(() => {
      spyOn(data, 'getAllProgs').and.returnValue(Promise.resolve(mockData.all));
    });

    it('should test if the function is defined', () => {
      expect(data.getAllProgs).toBeDefined();
    });

    it('should test if all programmes are returned', () => {
      data.getAllProgs().then((allProgs: any[]) => {
        expect(allProgs).toBeDefined();
        expect(allProgs.length).toBeGreaterThan(0);
      });
    });
  });
});
