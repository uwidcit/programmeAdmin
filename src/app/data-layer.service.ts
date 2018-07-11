import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private http: HttpClient) { }

  getFacultyNames() {
    return this.http.get(environment.facURL);
  }

  getProgsByFaculty(faculty: string) {
    return this.http.get(environment.allProgsBy + faculty);
  }
}
