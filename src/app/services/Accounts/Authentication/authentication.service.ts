import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ServerEnvironment from '../../serverEnvironments';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login (userName: string, password: string, specialTokenRequest: boolean = false)
  {
    var body = {
      UserName: userName,
      Password: password,
      SpecialRequestToken: specialTokenRequest,
    }
    return this.http.post(ServerEnvironment.baseURL + "Account/login", body);
  }

  getUserData = () => {
    let data = localStorage.getItem("userData");
    return JSON.parse(data);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem("userData");
  }
}
