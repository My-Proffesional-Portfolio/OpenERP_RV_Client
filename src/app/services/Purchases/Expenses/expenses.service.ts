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

  postInvoiceFile(file: FileList)
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

    for (let index = 0; index < file.length; index++) {
      var singleFile = file[index];
      formdata.append("files[]", singleFile);
      
    }

    // formdata.append("file[]", file);

    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };
    
    return fetch(ServerEnvironment.baseURL + "expense/uploadCFDI", requestOptions)
      .then(response => response.json())
      
    
  }


  getExpenses(page, itemsPerPage, searchTerm){
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.authService.getUserData().token}`
    // })
    const headers = this.initHeaders();

    return this.http.get(ServerEnvironment.baseURL + `expense?currentPage=${page}&pageSize=${itemsPerPage}&searchTerm=${searchTerm}`, {headers: headers});
  }

  getExpenseDetail(id){
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${this.authService.getUserData().token}`
    // })
    const headers = this.initHeaders();

    return this.http.get(ServerEnvironment.baseURL + `expense/detail?id=${id}`, {headers: headers});
  }

  downloadExpenseCFDI(expense: any) {
    debugger;
    var fileDateForName = new Date(expense.expenseDate);
    var fileName = expense.supplierTaxID + " " + fileDateForName.getDay() + "-" + fileDateForName.getMonth() + "-" + fileDateForName.getFullYear() + ".xml";
    var element = document.createElement('a');
    var text = expense.xml;
    element.setAttribute('href', 'data:text/plain;charset=unicode,' + encodeURIComponent(text));
    element.setAttribute('download', fileName);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }


}
