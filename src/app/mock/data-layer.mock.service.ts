import { Injectable } from '@angular/core';
import { Mockdata} from './mock-data';
@Injectable({
  providedIn: 'root'
})
export class DataLayerMockService {
  constructor() {
  }

  getFacultyNames(testData): Promise<Object> {
    const fac_names = sessionStorage.getItem('fac_names');
    if (fac_names === null) {
      console.log('Faculty names not cached. Polling server...');
      if (testData === null || testData === undefined) { return Promise.reject('Returned data was null or undefined'); }
      if (typeof testData !== 'object') {
        return Promise.reject('Returned data was not an object');
      } else {
        Object.keys(testData).forEach(key => {
          if (typeof key  !== 'string') { return Promise.reject(key + ' is not a string'); }
          if (typeof testData[key] !== 'string') { return Promise.reject(testData[key] + ' is not a string'); }
          if (!/^[a-zA-z]+$/.test(key)) { return Promise.reject(key + ' should only contain letters'); }
          if (!/^[a-zA-z]+$/.test(testData[key])) {
            return Promise.reject(testData[key] + ' should only contain letters');
          }
        });
        return Promise.resolve(testData);
      }
    } else {
      return this.staticPromise(fac_names); }
  }

  getProgsByFaculty(faculty_name: string, testData): Promise<Object> { // testing finished
    const programmes = sessionStorage.getItem(faculty_name + '_programmes');
    if (programmes === null) {
      console.log('Programmes from ' + faculty_name + ' not cached. Polling server...');
      if (faculty_name === undefined || faculty_name === null) {
        return Promise.reject('Undefined or null was passed in for a faculty name');
      }
      if (typeof faculty_name !== 'string') { return Promise.reject('Given faculty name is not a string'); }
      if (!/^[a-zA-z]+$/.test(faculty_name)) {
        return Promise.reject('Only letters are allowed in the faculty name');
      }

      if (testData === undefined || testData === null) {
        return Promise.reject('Returned data was undefined or null');
      }

      if (!(testData instanceof Array)) {
        return Promise.reject('Returned data was not an Array');
      }

      testData.forEach(prog => {
        if (typeof prog !== 'object') {
          return Promise.reject('Some data inside of the array is not an object');
        }

        const keys = [
          'name', 'description', 'type',
          'faculty', 'department', 'url',
          'part_time', 'full_time', 'campus',
          'requirements', 'possible_careers'
        ];
        Object.keys(prog).forEach(key => {
          if (!keys.includes(key)) {
            return Promise.reject('Important fields are missing from the programme Object');
          }
          // allow letters and underscores
          if (prog[key] === undefined) {
            return Promise.reject('Undefined data inside programme Object');
          }
        });
      });


      sessionStorage.setItem(faculty_name + '_programmes', testData[faculty_name]);
      return Promise.resolve(testData[faculty_name]);
    } else { return this.staticPromise(programmes); }
  }

  getAllProgs(): Promise<Object> {
    const allProgs = sessionStorage.getItem('all_progs');
    if (allProgs === null) {
      console.log('All Programmes not cached. Polling server...');
      let all = [];
      const allFacs = Object.keys(Mockdata.faculty);
      allFacs.forEach((fac_name: string) => {
        all = all.concat(Mockdata.faculty[fac_name]);
        if (allFacs.indexOf(fac_name) === allFacs.length - 1) {
          all = all.sort((a, b) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0;
          });
          sessionStorage.setItem('all_progs', JSON.stringify(all));
          return this.staticPromise(JSON.stringify(all));
        }
      });
    } else {
      return this.staticPromise(allProgs);
    }
  }

  getFacStats(testData) { // testing finished
    const fac_stats = sessionStorage.getItem('fac_stats');
    if (fac_stats === null) {
      console.log('Faculty numbers not caches. Polling server...');

      if (testData === null || testData === undefined) {
        return Promise.reject('Returned faculty data was null or undefined');
      }
      if (typeof testData !== 'object') {
        return Promise.reject('Returned faculty data was not an object');
      }

      Object.keys(testData).forEach(stat => {
        if (typeof stat !== 'string') { return Promise.reject(stat + ' should be a string'); }
        if (!/^[a-zA-z]+$/.test(stat)) { return Promise.reject(stat + ' should only contain letters'); }
        if (typeof testData[stat] !== 'number') { return Promise.reject(testData[stat] + ' should be a number'); }
      });

      return Promise.resolve(testData);
    } else { return this.staticPromise(fac_stats); }
  }

  getSubjects(testData): Promise<Object> { // testing finished
    const subjects = sessionStorage.getItem('subjects');
    if (subjects === null) {
      console.log('Subjects not caches. Polling server...');

      if (testData === null || testData === undefined) {
        return Promise.reject('Undefined or null value was returned');
      }
      if (!(testData instanceof Array)) {
        return Promise.reject('An Array was not returned when it was expected');
      }

      testData.forEach(sub => {
        if (sub === undefined || sub === null) { return Promise.reject('Array contains undefined data'); }
        if (typeof sub !== 'object') { return Promise.reject('Array does not contain only Objects'); }
        if (sub.name === undefined || null) { return Promise.reject('Subject name is undefined or null'); }
        if (sub.level === undefined || null) { return Promise.reject('Subject level is undefined or null'); }
        if (typeof sub.name !== 'string') { return Promise.reject('Subject name is not a string'); }
        if (typeof sub.level !== 'string') { return Promise.reject('Subject level is not a string'); }
        if (!sub.name.includes(sub.level)) { return Promise.reject('Subject level should be after the subject name in brackets'); }
      });
      sessionStorage.setItem('subjects', JSON.stringify(testData));
      return Promise.resolve(testData.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      }));

    } else { return this.staticPromise(subjects); }
  }

  getErrors(testData): Promise<Object> { // testing finished
    const errors = sessionStorage.getItem('errors');
    if (errors === null) {
      console.log('Errors not cached. Polling server...');
      if (testData === null || testData === undefined) {
        return Promise.reject('Returned data was null or undefined');
      }

      if (!(testData instanceof Array)) {
        return Promise.reject('Returned data should be an array');
      }

      testData.forEach(error => {
        if (typeof error !== 'object') { return Promise.reject('Data in array is not an Object'); }
        if (error.report === undefined) { return Promise.reject('Report field is missing from the error Object'); }
        Object.keys(error).forEach(key => {
          if (error[key] === undefined) { return Promise.reject('A field was undefined'); }
          Object.keys(error['report']).forEach(err_field => {
            if (typeof error['report'][err_field] !== 'string') { return Promise.reject(error['report'][err_field] + ' should be a string'); }
          });
        });
      });

      return Promise.resolve(testData);
    } else { return this.staticPromise(errors); }

  }

  staticPromise(fixedData: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      if (fixedData === undefined || fixedData === null) { reject('Null or undefined data found...'); }
      resolve(JSON.parse(fixedData));
    });
  }
}
