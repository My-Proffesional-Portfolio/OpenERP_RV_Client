import { Injectable } from '@angular/core';
import {HttpClient, HttpBackend, HttpHeaders} from '@angular/common/http';
import ServerEnvironment from '../../serverEnvironments';
import { AuthenticationService } from '../../Accounts/Authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {


  httpHeaders :HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthenticationService) { 
  
  }
 
  private initHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getUserData().token}`
    })
    return headers;
  }

  postInvoiceFile(file: File)
  {
     const headers = this.initHeaders();
    // debugger;
    // const formData : FormData = new FormData();
    // formData.append("File", file, file.name);
    // //formData.append("groupID", "34")
    // //headers.append("Content-Type", "multipart/form-data")

    
    // return this.http.post(ServerEnvironment.baseURL + "expense/uploadCFDI", formData, {headers: headers});
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + this.authService.getUserData().token);
     var formdata = new FormData();
    formdata.append("file", file, "2021052000314891001095509POSA.xml");

    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };
    
    return fetch(ServerEnvironment.baseURL + "expense/uploadCFDI", requestOptions)
      .then(response => response.json())
      
    
  }

}
