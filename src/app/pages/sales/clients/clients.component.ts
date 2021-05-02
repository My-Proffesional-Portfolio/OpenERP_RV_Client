import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ClientService } from 'src/app/services/Clients/client.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private clientService: ClientService, 
    private router : Router, 
    private authService: AuthenticationService,
    private modalService: NgbModal) { }

  clientsData: any;
  closeResult = '';
  selectedClient: any;
  newClients: any[] = [];
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  ngOnInit(): void {

    this.clientService.getClients().
    subscribe((data: any)=> {
      debugger;
      this.clientsData = data;

    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        if (errorEvent.status == 401)
        {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });

  }

  open(content, index) {

    this.selectedClient = this.clientsData.items[index];

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  openDelete(content, index) {

    this.selectedClient = this.clientsData.items[index];

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      alert("Call client delete service ");

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openBatchLoad(content) {


    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      alert("Call client delete service ");

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  download() {
    var element = document.createElement('a');
    var text = "Nombre empresa, Razón social, Contacto, RFC, Teléfono, Email, Dirección fiscal"
    element.setAttribute('href', 'data:text/plain;charset=unicode,' + encodeURIComponent(text));
    element.setAttribute('download', "Clientes.csv");
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  uploadListener($event: any): void {  
   debugger;
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        debugger;
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    this.newClients = [];
  
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
        csvRecord.address = curruntRecord[5];  
        this.newClients.push(csvRecord);  
      }  
    }  
    return this.newClients;  
  }  

  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  } 

  importFile(){
    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
