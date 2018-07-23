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
    return this.http.get(environment.facURL);
  }

  getFacStats() {
    return this.http.get(environment.facStats);
  }

  getProgsByFaculty(faculty: string) {
    return this.http.get(environment.allProgsBy + faculty);
  }
  getSubjects() {
    return this.http.get(environment.subjects);
  }

  getErrors() {
    return this.http.get(environment.getErrors);
  }
}

// excelUpload: 'localhost:3004/upload',
//   getErrors: 'https://snickdx.me:3004/errors',


