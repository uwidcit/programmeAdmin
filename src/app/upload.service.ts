import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }

  getProgrammeNumbers() {
    return this.http.get(environment.programmeNumberURL);
  }

  // postMovie (newMovie: any): Observable<MovieElement> {
  //   return this.http.post<MovieElement>((environment.url), newMovie);
  // }
}
