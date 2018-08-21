import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Mockdata } from './mock/mock-data';
import {DataLayerMockService} from './mock/data-layer.mock.service';


describe('DataLayerService', () => {
  let service: DataLayerMockService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DataLayerMockService,
          useClass: DataLayerMockService
        },
      ]
    });
    service = TestBed.get(DataLayerMockService);
  });
  it('should be created', inject([DataLayerMockService], (tempService: DataLayerMockService) => {
    expect(tempService).toBeTruthy();
  }));
});

describe('DataLayerService', () => {
  const data: DataLayerMockService = new DataLayerMockService();

  describe('Testing getFacultyNames', () => {

    it('- should test if the function is defined', () => {
      expect(data.getFacultyNames).toBeDefined();
      expect(data.getFacultyNames(Mockdata.facNames.good)).toBeDefined();
    });

    it('- should test if a Promise is returned', (done) => {
      expect(data.getFacultyNames(Mockdata.facNames.good).then).toBeDefined();
      done();
    });

    it('- should return a rejected Promise when given undefined data', (done) => {
      data.getFacultyNames(undefined)
        .then( () => {}, (error) => { expect(error).toBe('Returned data was null or undefined'); });
      done();
    });

    it(' - should return a rejected Promise when given any data type other than "object"', (done) => {
      data.getFacultyNames(true)
        .then(() => {}, (error) => {
          expect(error).toBe('Returned data was not an object');
        });

      done();
    });

    it('- should return a rejected Promise when object does not contain a string', (done) => {
      data.getFacultyNames({'test': true})
        .then(() => {}, (error) => {
          expect(error).toContain(' is not a string');
        });
      done();
    });

    it('- should return a rejected Promise when a string contains a number character', (done) => {
      data.getFacultyNames({ 'fac': 'fac123' })
        .then(() => {}, (error) => {
        expect(error).toContain('should only contain letters');
      });
      done();
    });
    it('- should return more than 0 faculty names in a Promise', (done) => {
      data.getFacultyNames(Mockdata.facNames.good).then(names => {
        expect(names).toBeDefined();
        expect(Object.keys(names).length).toBeGreaterThan(0);
      }).catch(error => {
        console.log(error);
      });
      done();
    });
  });

  describe('Testing getFacStats', () => {

    it('- should test if the function is defined', () => {
      expect(data.getFacStats).toBeDefined();
    });

    it('- should test if the function returns a Promise', (done) => {
      expect(data.getFacStats(Mockdata.facStats.good).then).toBeDefined();
      done();
    });

    it('- should return a rejected Promise when given undefined data', (done) => {
      data.getFacStats(undefined)
        .then(() => {}, (error) => { expect(error).toBe('Returned faculty data was null or undefined'); done(); });
    });

    it('- should return a rejected Promise when given any data type instead of an object', (done) => {
      data.getFacStats(25)
        .then(() => {}, (error) => { expect(error).toBe('Returned faculty data was not an object'); done(); });
    });

    it('- should return a rejected Promise when an object has any keys or values other than strings', (done) => {
      data.getFacStats({ 2132: 21353 }).then(() => {}, (error) => { expect(error).toContain('should be a string'); });
      data.getFacStats({ 'hello': 21353 }).then(() => {}, (error) => { expect(error).toContain('should be a string'); });
      done();
    });

    it('- should return a rejected Promise if any strings are empty or contains non-alphabetical characters', (done) => {
      data.getFacStats({ 'fac': '' }).then(() => {}, (error) => { expect(error).toContain('should only contain letters'); });
      done();
    });
  });
  //
  describe('Testing getErrors', () => {

    it('- should test if the function is defined', () => {
      expect(data.getErrors).toBeDefined();
    });

    it('- should test if the function returns a Promise', (done) => {
      expect(data.getErrors(Mockdata.errors.good).then).toBeDefined();
      done();
    });

    it('- should return a rejected Promise if given undefined data', (done) => {
      data.getErrors(undefined).then(
        () => {},
        (error) => { expect(error).toBe('Returned data was null or undefined'); }
      );
      done();
    });

    it('- should return a rejected Promise if given any other data type other than an Array', (done) => {
      data.getErrors(25).then(
        () => {},
        (error) => {
          expect(error).toBe('Returned data should be an array');
        }
      );
      done();
    });

    it('- should return a rejected Promise if not given an array of Objects', () => {
      data.getErrors([1, 2, 3, 4, 5]).then(
        () => {},
        (error) => {
          expect(error).toBe('Data in array is not an Object');
        }
      );
    });

    it('- should return a rejected Promise if the "report" field is missing from any Object in the returned Array', (done) => {
      data.getErrors([{
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
      }]).then(
        () => {
        },
        (error) => {
          expect(error).toBe('Report field is missing from the error Object');
        });
      done();
    });

    it('- should return a rejected Promise if any value in the "report" Object is not a string', (done) => {
      data.getErrors([{
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
          'corrected': 1239123,
          'missing_subjects': 20414,
          'mandatory': 'Empty array',
          'req_conflict': [],
          'passes': {},
          'classes': undefined
        }
      }]).then(
        () => {},
        (error) => {
          expect(error).toContain('should be a string');
        }
      );
      done();
    });

  });
  //
  describe('Testing getProgsByFaculty', () => {

    it('- should test if the function is defined', () => {
      expect(data.getProgsByFaculty).toBeDefined();
    });

    it('- should test if the function returns a Promise', (done) => {
      expect(data.getProgsByFaculty('facOne', Mockdata.faculty).then).toBeDefined();
      done();
    });

    it('- should return a rejected Promise when given undefined data', (done) => {
      data.getProgsByFaculty(undefined, undefined).then(
        () => {},
        (error) => {
          expect(error).toBe('Undefined or null was passed in for a faculty name');
          done();
        }
      );
      data.getProgsByFaculty('facOne', undefined).then(
        () => {},
        (error) => {
          expect(error).toBe('Returned data was undefined or null');
          done();
        }
      );
    });

    it('- should check whether the given faculty actually exists', (done) => {
      data.getProgsByFaculty('wijidejde', Mockdata.faculty['wijidejde']).then(
        () => {},
        (error) => {
          expect(error).toBe('Returned data was undefined or null');
        }
      );

      done();
    });

  });

  describe('Testing getSubjects', () => {
    it('- should check if the function is defined', () => {
      expect(data.getSubjects).toBeDefined();
    });

    it('- should check if the function returns a Promise', (done) => {
      expect(data.getSubjects(Mockdata.subs.good).then).toBeDefined();
      done();
    });

    it('- should return a rejected Promise when undefined or null data is returned', (done) => {
      data.getSubjects(undefined).then(
        () => {},
        (error) => { expect(error).toBe('Undefined or null value was returned'); }
      );

      data.getSubjects(null).then(
        () => {},
        (error) => { expect(error).toBe('Undefined or null value was returned'); }
      );

      done();
    });

    it('- should return a rejected Promise if an Array is not returned', (done) => {
      data.getSubjects(25).then(
        () => {},
        (error) => { expect(error).toBe('An Array was not returned when it was expected'); }
      );

      done();
    });

    it('- should return a rejected Promise if Objects in the array are nor properly formatted', (done) => {
      data.getSubjects([undefined, 1, 2, 3]).then(
        () => {},
        (error) => { expect(error).toBe('Array contains undefined data'); }
      );

      data.getSubjects([1, 2, 3, 4, 5]).then(
        () => {},
        (error) => { expect(error).toBe('Array does not contain only Objects'); }
      );

      data.getSubjects([{'sub_name': 'Sub 9 (CSEC)', 'level': 'CSEC'}]).then(
        () => {},
        (error) => { expect(error).toBe('Subject name is undefined or null'); }
      );

      data.getSubjects([{'name': 'Sub 10 (CAPE)', 'sub_level': 'CAPE'}]).then(
        () => {},
        (error) => { expect(error).toBe('Subject level is undefined or null'); }
      );

      data.getSubjects([{'name': 25, 'level': 'CAPE'}]).then(
        () => {},
        (error) => { expect(error).toBe('Subject name is not a string'); }
      );

      data.getSubjects([{'name': 'test_name', 'level': true}]).then(
        () => {},
        (error) => { expect(error).toBe('Subject level is not a string'); }
      );

      data.getSubjects([{'name': 'test_name', 'level': 'CAPE'}]).then(
        () => {},
        (error) => { expect(error).toBe('Subject level should be after the subject name in brackets'); }
      );

      done();
    });


  });
});
