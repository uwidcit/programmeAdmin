import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

/**
 * This service is responsible for any fetching of data from the backend.
 * All data is returned wrapped up inside of a promise to make use of the
 * asynchronous property and to standardize the return type of this service.
 * To lessen the load on the backend, {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage sessionStorage} is used.
 * Local Storage can be used in the future, but only when an updated upload flag is placed on the server to let all other clients know to
 * clear their local storage and fetch the newly uploaded data.
 * */
@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  fac_names = null;
  allProgs = null;
  programmes = null;
  fac_stats = null;
  errors = null;
  subjects = null;

  constructor(private http: HttpClient) {
  }

  /**
   * Gets the names of all the faculties
   * @return {Promise<Object>} A promise containing a string array of all the faculty names
   */
  getFacultyNames(): Promise<Object> {

    if (this.fac_names === null) {
      console.log('Faculty names not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.facURL).subscribe((names: any) => {

          if (names === null || names === undefined) { reject('Returned data was null or undefined'); }
          if (typeof names !== 'object') {
            reject('Returned data was not an object');
          } else {
            Object.keys(names).forEach(key => {
              if (typeof key  !== 'string') { return reject(key + ' is not a string'); }
              if (typeof names[key] !== 'string') { return reject(names[key] + ' is not a string'); }
              if (!/^[a-zA-z]+$/.test(key)) { return reject(key + ' should only contain letters'); }
              if (!/^[a-zA-Z0-9_]+( [a-zA-Z0-9_&]+)*$/.test(names[key])) {
                return reject(names[key] + ' should only contain letters');
              }
            });
            //sessionStorage.setItem('fac_names', JSON.stringify(names));
            resolve(names);
          }
        }, (error) => {
          console.log(error);
          reject('Something is wrong with either your connection or our servers');
        });
      });
    } else { return this.staticPromise(this.fac_names); }
  }

  /**
   * Gets a list of all programmes. It queries the backend per faculty and
   * then gets all programmes by that faculty.
   * @return {Promise<Object>} A promise containing all programme objects
   */
  getAllProgs(): Promise<Object> { // testing finished

    if (this.allProgs === null) {
      console.log('All Programmes not cached. Polling server...');
      return new Promise((resolve, reject) => {
        let all = [];
        const allFacs = Object.values(environment.faculties);
        allFacs.forEach(fac_name => {
          this.getProgsByFaculty(fac_name)
            .then(progs => {
              all = all.concat(progs);
              if (allFacs.indexOf(fac_name) === allFacs.length - 1) { // when end of array is reached inside of forEach
                all = all.sort((a, b) => {
                  if (a.name > b.name) { return 1; }
                  if (a.name < b.name) { return -1; }
                  return 0;
                });
                //sessionStorage.setItem('all_progs', JSON.stringify(all));
                resolve (all);
              }
            })
            .catch(error => { reject(error); });

        });
      });
    } else {
      return this.staticPromise(this.allProgs);
    }
  }

  /**
   * Gets all the programmes offered by a single faculty
   * @param faculty - The abbreviation of a faculty name
   * @return {Promise<Object>} A promise containing all programme objects from a single faculty
   */
  getProgsByFaculty(faculty: string): Promise<Object> { // testing finished

    if (this.programmes === null) {
        console.log('Programmes from ' + faculty + ' not cached. Polling server...');
        return new Promise((resolve, reject) => {
          this.http.get(environment.allProgsBy + faculty).subscribe((progs: any) => {

            if (progs === undefined || progs === null) {
              console.log('Undefined or null data returned from the server');
              reject('Received badly formatted data');
            }
            if (!(progs instanceof Array)) {
              console.log('Returned data was not an array');
              reject('Received no data from the server');
            }

            progs.forEach(prog => {
              if (typeof prog !== 'object') {
                console.log('Some data inside of the array is not an object');
                reject('Contents of returned data is badly formatted');
              }

              const keys = [
                'id', 'name', 'description', 'type',
                'faculty', 'department', 'url',
                'part_time', 'full_time', 'evening',
                'campus', 'requirements'
              ];
              Object.keys(prog).forEach(key => {
                if (!keys.includes(key)) {
                  console.log(key + ' was not included in ' + prog);
                }
                if (prog[key] === undefined) {
                  console.log('Value of ' + key + ' is undefined');
                }
              });
            });

            progs = progs.sort((a, b) => {
              if (a.name > b.name) { return 1; }
              if (a.name < b.name) { return -1; }
              return 0;
            });
            //sessionStorage.setItem(faculty + '_programmes', JSON.stringify(progs));
            resolve(progs);
          }, (error: any) => { reject(error); });
        });
    } else { return this.staticPromise(this.programmes); }
  }

  /**
   * Gets the number of programmes offered by each faculty
   * @return {Promise<Object>} A promise containing each faculty and the number of programmes offered
   */
  getFacStats() { // testing finished
    if (this.fac_stats === null) {
      console.log('Faculty numbers not caches. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.facStats).subscribe((stats: any) => {

          if (stats === null || stats === undefined) {
            console.log('Undefined or null data returned from the server');
            reject('Received no data from the server');
          }
          if (typeof stats !== 'object') {
            console.log('Returned data was not an array');
            reject('Received badly formated data');
          }

          Object.keys(stats).forEach(stat => {
            if (typeof stat !== 'string') {
              console.log(stat + ' should be a string');
              reject('Faculty data from server is badly formatted');
            }
            if (!/^[a-zA-Z0-9_]+( [a-zA-Z0-9_&]+)*$/.test(stat)) {
              console.log(stat + ' should only contain letters');
              reject('Faculty data from server is badly formatted');
            }
            if (typeof stats[stat] !== 'number') {
              console.log('Faculty data from server is badly formatted');
              reject(stats[stat] + ' should be a number');
            }
          });

          //sessionStorage.setItem('fac_stats', JSON.stringify(stats));
          resolve(stats);
        }, (error) => { reject(error); });
      });
    } else { return this.staticPromise(this.fac_stats); }
  }

  /**
   * Gets a list of all subjects currently stored in the backend. Note that the proramme information being uploaded should contain
   * only subjects from this list, else the programme itself with be shown as an error.
   * @return {Promise<Object>} A promise containing all subjects
   */
  getSubjects(): Promise<Object> { // testing finished
    if (this.subjects === null) {
      console.log('Fetching subjects');
      return new Promise((resolve, reject) => {
        this.http.get(environment.subjects).subscribe((subs: any) => {

          if (subs === null || subs === undefined) {
            reject('Undefined or null value was returned');
          }
          if (!(subs instanceof Array)) {
            reject('An Array was not returned when it was expected');
          }

          // subs.forEach(sub => {
          //   if (sub === undefined || sub === null) { reject(`Array contains undefined data ${JSON.stringify(sub)}`); }
          //   if (typeof sub !== `object`) { reject(`Array does not contain only Objects ${JSON.stringify(sub)}`); }
          //   if (sub.name === undefined || null) { reject(`Subject name is undefined or null ${JSON.stringify(sub)}`); }
          //   if (sub.level === undefined || null) { reject(`Subject level is undefined or null ${JSON.stringify(sub)}`); }
          //   if (typeof sub.name !== `string`) { reject(`Subject name is not a string ${JSON.stringify(sub)}`); }
          //   if (typeof sub.level !== `string`) { reject(`Subject level is not a string ${JSON.stringify(sub)}`); }
          //   if (!sub.name.includes(sub.level)) { reject(`Subject level should be after the subject name in brackets ${JSON.stringify(sub)}`); }
          // });
          // sessionStorage.setItem('subjects', JSON.stringify(subs));
          resolve(subs.sort((a, b) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0;
          }));
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(this.subjects); }
  }

  /**
   * Gets all erroneous programmes from the backend
   * @return {Promise<Object>} A promise containing a list of all programme errors
   */
  getErrors(id): Promise<Object> { // testing finished

    if (this.errors === null) {
      console.log('Errors not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.getErrors+id+'.json').subscribe((errs: any) => {

          if (errs === null || errs === undefined) { reject('Returned data was null or undefined'); }
          if (!(errs instanceof Array)) { reject('Returned data should be an array'); }

          errs.forEach(error => {
            if (typeof error !== 'object') { reject('Data in array is not an Object'); }
            if (error.report === undefined) { reject('Report field is missing from the error Object'); }
            Object.keys(error).forEach(key => {
              if (error[key] === undefined) { reject('A field was undefined'); }
              Object.keys(error['report']).forEach(err_field => {
                if (err_field !== 'valid' && typeof error['report'][err_field] !== 'string') { reject('Value of ' + err_field + ' should be a string'); }
              });
            });
          });

          //sessionStorage.setItem('errors', JSON.stringify(errs));
          resolve(errs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(this.errors); }

  }

  /**
   * Wraps up sessionStorage data in a promise if the data exists
   * @param fixedData - Any data fetched from sessionStorage
   * @return {Promise<Object>} A promise containing data already stored in sessionStorage
   */
  staticPromise(fixedData: any): Promise<Object> {
    return new Promise((resolve, reject) => {
      if (fixedData === undefined || fixedData === null) { reject('Null or undefined data found...'); }
      resolve(JSON.parse(fixedData));
    });
  }

  getUploads() {
    return this.http.get(environment.host+'/uploads');
  }

  deleteUpload(id: any) {
    return this.http.delete(environment.host+'/uploads/'+id);
  }

  activateUpload(id: any) {
    return this.http.get(environment.host+'/sync/'+id);
  }
}
