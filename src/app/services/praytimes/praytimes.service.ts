import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PraytimesService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl

  getDailyPrayTimes(region: string, date: string): Observable<any> {
    console.log(`${this.baseUrl}/GetDailyPrayTimes/${region}/${date}`)
    return this.httpClient.get(`${this.baseUrl}/GetDailyPrayTimes/${region}/${date}`)
  }

  getMonthlyPrayTimes(region: string, date: string): Observable<any> {
    console.log(`${this.baseUrl}/GetMonthlyPrayTimes/${region}/${date}`)
    return this.httpClient.get(`${this.baseUrl}/GetMonthlyPrayTimes/${region}/${date}`)
  }
}
