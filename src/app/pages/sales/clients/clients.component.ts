import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Accounts/Authentication/authentication.service';
import { ClientService } from 'src/app/services/Sales/Clients/client.service';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from 'src/app/services/Utils/files.service';
import { PaginationModel } from 'src/app/models/Utils/Pagination';
import { PagerService } from 'src/app/services/Utils/pager.service';



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
  viewPageLinks: number[];
  totalItems: number;
  downloadProcessing: boolean;

  constructor(private clientService: ClientService, 
    private router : Router, 
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private fileService : FilesService,
    private pagerService : PagerService) { }

  processing: boolean;
  clientsData: any;
  closeResult = '';
  selectedClient: any;
  newClients: any[] = [];
  itemsPerPageOptionValue: Array<PaginationModel.IItemsPerPage>;
  selectedItemPerPageOption: PaginationModel.IItemsPerPage;
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  ngOnInit(): void {
    this.itemsPerPageOptionValue = this.pagerService.getItemPerPageOptions();
    this.selectedItemPerPageOption = this.itemsPerPageOptionValue[0];
    this.getClients();
  }


  firstPage(){
    this.currentPage = 0;
    this.getClients();
  }

  lastPage(){
    this.currentPage = this.totalPages -1;
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
      this.totalItems = data.totalItems;
      this.viewPageLinks = this.pagerService.setPageLinks(this.currentPage, this.totalPages)

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

  getClientsForDownload() {
    this.downloadProcessing =  true;
    this.clientService.getClients(this.currentPage, 1000000).
    subscribe((data: any)=> {
      debugger;
      var element = document.createElement('a');
      var text = "Num. Cliente, Nombre empresa, Razón social, Contacto, RFC, Teléfono, Email, Dirección fiscal\n";
      for(var i = 0; i < data.items.length; i++)
      {
        var client = data.items[i];
        text+= client.number + "," + client.companyName + "," 
        + client.legalName + "," + client.contactName + "," + client.fiscalTaxID + ","
        + client.phone + "," + client.email + "," + client.fiscalAddress + "\n";
      }
      element.setAttribute('href', 'data:text/plain;charset=unicode,' + encodeURIComponent(text));
      element.setAttribute('download', "Catalogo clientes.csv");
    
      element.style.display = 'none';
      document.body.appendChild(element);
    
      element.click();
    
      document.body.removeChild(element);
      this.downloadProcessing =  false;

    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        if (errorEvent.status == 401)
        {
          this.authService.logout();
          this.router.navigate(['/login']);
          this.downloadProcessing =  false;
        }
        this.downloadProcessing =  false;
      });
  }

  manageItemsPerPage(event)
  {
    debugger;
    this.itemsPerPage = this.selectedItemPerPageOption.value;
    this.currentPage = 0;
    this.getClients();
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

  downloadTemplate() {
    this.clientService.downloadClientsCsvTemplate();
  }
  
  uploadListener($event: any): void {  
    let files = $event.srcElement.files;  
  
    if (this.fileService.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        debugger;
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.fileService.getHeaderArray(csvRecordsArray);  
        this.newClients = this.clientService.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  
 
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
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
