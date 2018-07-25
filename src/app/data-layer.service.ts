import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private http: HttpClient) {
  }

  getFacultyNames() {
    const fac_names = sessionStorage.getItem('fac_names');
    if (fac_names === null) {
      console.log('Faculty names not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.facURL).subscribe((names: any) => {
          sessionStorage.setItem('fac_names', JSON.stringify(names));
          resolve(names);
        }, (error) => reject(error));
      });
    } else { return this.staticPromise(fac_names); }
  }

  getAllProgs() {
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

  getProgsByFaculty(faculty: string) {
    const programmes = sessionStorage.getItem(faculty + '_programmes');
    if (programmes === null) {
        console.log('Programmes from ' + faculty + ' not cached. Polling server...');
        return new Promise((resolve, reject) => {
        this.http.get(environment.allProgsBy + faculty).subscribe((progs: any) => {
          sessionStorage.setItem(faculty + '_programmes', JSON.stringify(progs));
          resolve(progs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(programmes); }
  }

  getFacStats() {
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

  getSubjects() {
    const subjects = sessionStorage.getItem('subjects');
    if (subjects === null) {
      console.log('Subjects not caches. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.subjects).subscribe((subs: any) => {
          sessionStorage.setItem('subjects', JSON.stringify(subs));
          resolve(subs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(subjects); }
  }

  getErrors() {
    const errors = sessionStorage.getItem('errors');
    if (errors === null) {
      console.log('Errors not cached. Polling server...');
      return new Promise((resolve, reject) => {
        this.http.get(environment.getErrors).subscribe((errs: any) => {
          console.log(errs);
          sessionStorage.setItem('errors', JSON.stringify(errs));
          resolve(errs);
        }, (error: any) => { reject(error); });
      });
    } else { return this.staticPromise(errors); }

  }

  staticPromise(fixedData: any) {
    return new Promise((resolve, reject) => {
      if (fixedData === undefined || fixedData === null) { reject('Null or undefined data found...'); }
      resolve(JSON.parse(fixedData));
    });
  }

  downloadErrors() {
    return this.http.get(environment.downloadErrors);
  }
}
