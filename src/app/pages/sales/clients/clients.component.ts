import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Authentication/authentication.service';
import { ClientService } from 'src/app/services/Clients/client.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

interface IItemsPerPage
{
  text: string;
  value: number;

}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  modal : NgbModalRef;
  isVisibleTableSet: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 0;
  totalPages: number;
  pageLinks: number[];
  viewPageLinks: number[];

  constructor(private clientService: ClientService, 
    private router : Router, 
    private authService: AuthenticationService,
    private modalService: NgbModal) { }

  processing: boolean;
  clientsData: any;
  closeResult = '';
  selectedClient: any;
  newClients: any[] = [];
  itemsPerPageOptionValue: Array<IItemsPerPage>;
  selectedItemPerPageOption: IItemsPerPage;
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  ngOnInit(): void {
    // this.itemsPerPageOptionValue = [10, 25, 100, 500]
    this.itemsPerPageOptionValue = new Array<IItemsPerPage>();
    this.itemsPerPageOptionValue.push(<IItemsPerPage>{text: "10 (Predeterminado)", value: 10})
    this.itemsPerPageOptionValue.push(<IItemsPerPage>{text: "25", value: 25})
    this.itemsPerPageOptionValue.push(<IItemsPerPage>{text: "50", value: 50})
    this.itemsPerPageOptionValue.push(<IItemsPerPage>{text: "100", value: 100})
    this.itemsPerPageOptionValue.push(<IItemsPerPage>{text: "500 (No recomendado)", value: 500})
    this.selectedItemPerPageOption = this.itemsPerPageOptionValue[0];
    this.getClients();
  }

  nextPage(){
    this.currentPage++;
    this.getClients();
  }

  previousPage(){
    this.currentPage--;
    this.getClients();
  }

  goToPage(pageNumber)
  {
    this.currentPage = pageNumber;
    this.getClients();
  }

  getClients() {
    this.clientService.getClients(this.currentPage, this.itemsPerPage).
    subscribe((data: any)=> {
      debugger;
      this.clientsData = data;
      this.totalPages = data.totalPages;
      this.pageLinks =[...Array(this.totalPages)].map((_,i) => i);
      this.setPageLinks();

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

  manageItemsPerPage(event)
  {
    debugger;
    this.itemsPerPage = this.selectedItemPerPageOption.value;
    this.currentPage = 0;
    this.getClients();
  }

  setPageLinks ()
  {
    debugger;
    this.viewPageLinks  = [];
    var pageCounter = 0;

      for(var cp = this.currentPage - 3; pageCounter < 7; cp++)
      {

        if (cp >= 0){
          this.viewPageLinks[pageCounter] = cp;
          pageCounter++;
        }

        if (cp == this.totalPages -1)
          break;

      
      }

      console.log(this.viewPageLinks);
  } 

  open(content, index) {

    this.selectedClient = this.clientsData.items[index];

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
  
  openDelete(content, index) {

    this.selectedClient = this.clientsData.items[index];

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      alert("Call client delete service ");

    }, (reason) => {
    });
  }

  openBatchLoad(content) {


   this.modal =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
   this.modal.result.then((e) => {
      console.log("dialogo cerrado")
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
    this.newClients = [];
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

  public addAwaitedClient(newClient): Promise<any>{
    return this.clientService.addClient(newClient).toPromise();
  }

  // https://stackoverflow.com/questions/47605737/how-to-make-a-synchronous-call-in-angular-5
  async importFile(){
    this.processing = true;
    for (var i = 0; i < this.newClients.length; i++)
    {
      await this.addAwaitedClient(this.newClients[i]);
    }
    this.processing = false;
    this.modal.close();
    this.getClients();

    
  }

  setConfirmationTableVisible (){
    this.isVisibleTableSet = true;
  }

}
