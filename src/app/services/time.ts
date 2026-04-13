import { Injectable } from '@angular/core';
import { Time as TimeModel } from '../../Models/time.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {

  private apiUrl = 'http://localhost:5158/api/times';
  constructor(private http: HttpClient) {}

  getTimes(): Observable<TimeModel[]> {
    return this.http.get<TimeModel[]>(this.apiUrl);
  }

  salvarTime(time: TimeModel): Observable<TimeModel> {
    return this.http.post<TimeModel>(this.apiUrl, time);
  }
}
