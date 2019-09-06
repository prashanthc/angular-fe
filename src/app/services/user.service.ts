import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }

  getHeaders():HttpHeaders {
    let headers = new HttpHeaders();
    let token = null;
    if (this.authService.currentUserValue) {
      token = this.authService.currentUserValue.token;
    }
    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
        headers = headers.append("Authorization", token);
    }
    return headers;
}

  getEmployees(page="0", size="1000") {    
    let urlParams: HttpParams = new HttpParams();
    urlParams = urlParams.append('page', page);
    urlParams = urlParams.append('size', size);
    return this.http.get(`${this.authService.API_URL}/api/employees`, {headers:this.getHeaders(),  params:urlParams});
  }

}
