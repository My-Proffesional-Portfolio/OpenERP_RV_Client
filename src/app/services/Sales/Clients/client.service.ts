import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ServerEnvironment from '../../serverEnvironments';
import { AuthenticationService } from '../../Accounts/Authentication/authentication.service';

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

    return this.http.get(ServerEnvironment.baseURL + `client?currentPage=${page}&pageSize=${itemsPerPage}`, {headers: headers});
  }
 
  addClient(newClient)
  {
    const headers = this.initHeaders();
    return this.http.post(ServerEnvironment.baseURL + "client", newClient, {headers: headers});
  }

  downloadClientsCsvTemplate() {
    var element = document.createElement('a');
    var text = "Nombre empresa, Razón social, Contacto, RFC, Teléfono, Email, Dirección fiscal"
    element.setAttribute('href', 'data:text/plain;charset=unicode,' + encodeURIComponent(text));
    element.setAttribute('download', "Clientes.csv");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
     var newClients = [];
    debugger;
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: any = {};  
        csvRecord.companyName = curruntRecord[0];  
        csvRecord.legalName = curruntRecord[1];  
        csvRecord.contactName = curruntRecord[2];  
        csvRecord.fiscalTaxID = curruntRecord[3];  
        csvRecord.phone = curruntRecord[4];  
        csvRecord.email = curruntRecord[5];  
        csvRecord.fiscalAddress = curruntRecord[6];  
        newClients.push(csvRecord);  
      }  
    }  
    return newClients;  
  } 
}
