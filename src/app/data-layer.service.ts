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


  constructor(private http: HttpClient) {
  }

  /**
   * Gets the names of all the faculties
   * @return {Promise<Object>} A promise containing a string array of all the faculty names
   */
  getFacultyNames(): Promise<Object> {
    const fac_names = sessionStorage.getItem('fac_names');
    if (fac_names === null) {
      console.log('Faculty names not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.facURL).subscribe((names: any) => {
          sessionStorage.setItem('fac_names', JSON.stringify(names));
          resolve(names);
        });
      });
    } else { return this.staticPromise(fac_names); }
  }

  /**
   * Gets a list of all programmes. It queries the backend per faculty and
   * then gets all programmes by that faculty.
   * @return {Promise<Object>} A promise containing all programme objects
   */
  getAllProgs(): Promise<Object> { // testing finished
    const allProgs = sessionStorage.getItem('all_progs');
    if (allProgs === null) {
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
                sessionStorage.setItem('all_progs', JSON.stringify(all));
                resolve (all);
              }
            })
            .catch(error => { reject(error); });

        });
      });
    } else {
      return this.staticPromise(allProgs);
    }
  }

  /**
   * Gets all the programmes offered by a single faculty
   * @param faculty - The abbreviation of a faculty name
   * @return {Promise<Object>} A promise containing all programme objects from a single faculty
   */
  getProgsByFaculty(faculty: string): Promise<Object> { // testing finished
    const programmes = sessionStorage.getItem(faculty + '_programmes');
    if (programmes === null) {
        console.log('Programmes from ' + faculty + ' not cached. Polling server...');
        return new Promise((resolve, reject) => {
          this.http.get(environment.allProgsBy + faculty).subscribe((progs: any) => {
            progs = progs.sort((a, b) => {
              if (a.name > b.name) { return 1; }
              if (a.name < b.name) { return -1; }
              return 0;
            });
            sessionStorage.setItem(faculty + '_programmes', JSON.stringify(progs));
            resolve(progs);
          }, (error: any) => { reject(error); });
        });
    } else { return this.staticPromise(programmes); }
  }

  /**
   * Gets the number of programmes offered by each faculty
   * @return {Promise<Object>} A promise containing each faculty and the number of programmes offered
   */
  getFacStats() { // testing finished
    const fac_stats = sessionStorage.getItem('fac_stats');
    if (fac_stats === null) {
      console.log('Faculty numbers not caches. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.facStats).subscribe((stats: any) => {
          sessionStorage.setItem('fac_stats', JSON.stringify(stats));
          resolve(stats);
        }, (error) => { reject(error); });
      });
    } else { return this.staticPromise(fac_stats); }
  }

  /**
   * Gets a list of all subjects currently stored in the backend. Note that the proramme information being uploaded should contain
   * only subjects from this list, else the programme itself with be shown as an error.
   * @return {Promise<Object>} A promise containing all subjects
   */
  getSubjects(): Promise<Object> { // testing finished
    const subjects = sessionStorage.getItem('subjects');
    if (subjects === null) {
      console.log('Subjects not caches. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.subjects).subscribe((subs: any) => {
          subs = subs.sort((a, b) => {
            if (a.name > b.name) { return 1; }
            if (a.name < b.name) { return -1; }
            return 0;
          });
          sessionStorage.setItem('subjects', JSON.stringify(subs));
          resolve(subs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(subjects); }
  }

  /**
   * Gets all erroneous programmes from the backend
   * @return {Promise<Object>} A promise containing a list of all programme errors
   */
  getErrors(): Promise<Object> { // testing finished
    const errors = sessionStorage.getItem('errors');
    if (errors === null) {
      console.log('Errors not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.getErrors).subscribe((errs: any) => {
          sessionStorage.setItem('errors', JSON.stringify(errs));
          resolve(errs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(errors); }

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
}
