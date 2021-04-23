import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ServerEnvironment from '../serverEnvironments';
import { AuthenticationService } from '../Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { 
  }

  httpHeaders :HttpHeaders;
 
  private initHeaders() {
    debugger;
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.append('Content-Type', 'application/json');
    this.httpHeaders.append("Authorization", "Bearer " + this.authService.getUserData().token);
    return this.httpHeaders;
  }

  getClients(){
    debugger;
    // const httpOptions = {
    //   headers: this.initHeaders()
    // };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getUserData().token}`
    })

    return this.http.get(ServerEnvironment.baseURL + "client", {headers: headers});
  }
 

}
