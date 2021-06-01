import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ServerEnvironment from '../../serverEnvironments';
import { AuthenticationService } from '../../Accounts/Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  getProducts(page, itemsPerPage){
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.authService.getUserData().token}`
    // })
    const headers = this.initHeaders();

    return this.http.get(ServerEnvironment.baseURL + `products?currentPage=${page}&pageSize=${itemsPerPage}`, {headers: headers});
  }

}
