import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = environment.baseUrl

  addSiteRequests():Observable<any>{
    return this.httpClient.post(`${this.baseUrl}/Requests/AddSiteRequests`,{})
  }

  getSiteMonthlyRequests():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/Requests/GetMonthlySiteRequests`)
  }
  
  getAPIMonthlyRequests():Observable<any>{
    return this.httpClient.get(`${this.baseUrl}/Requests/GetMonthlyAPIRequests`)
  }
}
