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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getUserData().token}`
    })
    return headers;
  }

  getClients(page, itemsPerPage){
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.authService.getUserData().token}`
    // })
    const headers = this.initHeaders();

    return this.http.get(ServerEnvironment.baseURL + `client?currentPage=${page}&pageSize=10`, {headers: headers});
  }
 
  addClient(newClient)
  {
    const headers = this.initHeaders();
    return this.http.post(ServerEnvironment.baseURL + "client", newClient, {headers: headers});
  }

}
