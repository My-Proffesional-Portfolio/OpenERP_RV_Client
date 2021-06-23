import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PaginationModel } from 'src/app/models/Utils/Pagination';
import { AuthenticationService } from 'src/app/services/Accounts/Authentication/authentication.service';
import { ExpensesService } from 'src/app/services/Purchases/Expenses/expenses.service';
import { FilesService } from 'src/app/services/Utils/files.service';
import { PagerService } from 'src/app/services/Utils/pager.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

 columnNames = ['Proveedor', 'Dinero'];
 options = {
  // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
  is3D: true,
  width: 500,
  height: 350,
  hAxis: { format: 'currency' },
  titleTextStyle: {
    fontSize: 18, // 12, 18 whatever you want (don't specify px)
  }
};


  titlePie : string = "Compras por proveedor";
  typePie : string  = 'PieChart';
  dataPie : any;

  titleBar : string = "Montos x proveedor";
  typeBar : string  = 'ColumnChart';
  dataBar : any;

  modal : NgbModalRef;
  modalDelete: NgbModalRef;
  itemsPerPage: number = 10;
  currentPage: number = 0;
  totalPages: number;

  public isCollapsed = true;
  searchTerm : string = "";
  emissionStartDate: Date = null;
  emissionEndDate: Date = null;
  creationStartDate: Date = null;
  creationEndDate: Date = null;
  modalDeleteAll: NgbModalRef;
  deleteAllProcessing : boolean = false;
  deleteAllErrorMSG: string;
  downloadProcessing: boolean;



  constructor(private expenseService: ExpensesService, 
    private router : Router, 
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private fileService : FilesService,
    private pagerService : PagerService,
    private loginService: AuthenticationService) { }
  
    processing: boolean;
    expensesData: any;
    closeResult = '';
    selectedExpenses: any;
    newClients: any[] = [];
    itemsPerPageOptionValue: Array<PaginationModel.IItemsPerPage>;
    selectedItemPerPageOption: PaginationModel.IItemsPerPage;
    viewPageLinks: number[];
    totalItems: number;
    passwordToDelete: string;

  ngOnInit(): void {
    debugger;
    var currentDate = new Date();

    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDay();
    
    this.emissionStartDate = new Date(currentYear, currentMonth, 1);
    this.emissionEndDate = new Date();

    this.itemsPerPageOptionValue = this.pagerService.getItemPerPageOptions();
    this.selectedItemPerPageOption = this.itemsPerPageOptionValue[0];
    this.getExpenses();
  }

  openInfo(content, index) {

    this.selectedExpenses = this.expensesData.items[index];

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      alert("Call client delete service ");

    }, (reason) => {
    });
  }


  openDelete(content, index) {

    this.selectedExpenses = this.expensesData.items[index];

    this.modalDelete =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalDelete.result.then((e) => {
       console.log("dialogo cerrado")
   });

  }


  openDeleteAll(content) {

    this.modalDeleteAll =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modalDeleteAll.result.then((e) => {
       console.log("dialogo cerrado")
   });

  }


  confimDeleteExpenses()
  {

    this.expenseService.deleteExpense(this.selectedExpenses.id).
    subscribe((data: any)=> {
      debugger;
      if (data.errorMessages.length == 0)
      {
        this.modalDelete.close();
        this.resetSearch();
      }

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

  confimDeleteAll()
  {

    debugger;
    var userData = localStorage.getItem("userData");
    var user = JSON.parse(userData)
    this.deleteAllProcessing = true;
    this.loginService.login(user.userName, this.passwordToDelete, true).
    subscribe((data: any)=> {
      debugger;
     
      if (data.errorMessages.length == 0)
      {
        this.CallDeleteAllExpenseService(data);
      }
      else{
        this.deleteAllProcessing = false;
        this.deleteAllErrorMSG = data.errorMessages[0];

      }
    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        this.deleteAllProcessing = false;
        if (errorEvent.status == 401)
        {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });

  }

  private CallDeleteAllExpenseService(data: any) {
    this.expenseService.deleteAllExpenses(data.token).
      subscribe((data: any) => {
        debugger;
        if (data.errorMessages.length == 0) {
          this.deleteAllProcessing = false;
          this.modalDeleteAll.close();
        }
        else
        {
          this.deleteAllProcessing = false;
          this.deleteAllErrorMSG = data.errorMessages[0];
        }
      }, (errorEvent) => {
        debugger;
        var e = errorEvent;
        if (errorEvent.status == 401) {
          this.deleteAllProcessing = false;
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
    this.getExpenses();
  }


  firstPage(){
    this.currentPage = 0;
    this.getExpenses();
  }

  lastPage(){
    this.currentPage = this.totalPages -1;
    this.getExpenses();
  }

  nextPage(){
    this.currentPage++;
    this.getExpenses();
  }

  previousPage(){
    this.currentPage--;
    this.getExpenses();
  }

  goToPage(pageNumber)
  {
    this.currentPage = pageNumber;
    this.getExpenses();
  }

  getExpenses() {
    debugger;
    this.expenseService.getExpenses(this.currentPage, this.itemsPerPage, this.searchTerm, this.emissionStartDate, this.emissionEndDate).
    subscribe((data: any)=> {
      debugger;
      this.expensesData = data;
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
      this.viewPageLinks = this.pagerService.setPageLinks(this.currentPage, this.totalPages);
      this.getProvidersExpenseGraphData();

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


  getProvidersExpenseGraphData()
  {

    this.expenseService.getExpenseReportGraph(this.emissionStartDate, this.emissionEndDate).subscribe((data: any) =>{
      debugger;
      this.dataPie = data;
    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        if (errorEvent.status == 401)
        {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      });

    // this.data  = [
    //       ['Firefox', 4],
    //       ['IE', 2],
    //       ['Chrome', 12],
    //       ['Safari', 8],
    //       ['Opera', 6],
    //       ['Others', 10] 
    //    ];
  }

  downloadCFDI() {

    this.expenseService.downloadExpenseCFDI(this.expensesData[0]);

  }

  openBatchLoad(content) {


    this.modal =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  size: 'xl', backdrop: 'static' });
    this.modal.result.then((e) => {
       console.log("dialogo cerrado")
   });  
   }

   resetSearch()
   {
    
    this.currentPage = 0;
    this.getExpenses();

   }

   refreshAfterLoad(){
    this.modal.close();
    this.resetSearch();
   }

   getExpenseItems() {
    this.downloadProcessing =  true;
    this.expenseService.getExpenseItems().
    subscribe((data: any)=> {
      debugger;
      var element = document.createElement('a');
      var text = "Articulo, Total, Subtotal, Impuesto, Provedor\n";
      for(var i = 0; i < data.length; i++)
      {
        var client = data[i];
        text+= client.description + "," + client.total + "," 
        + client.subtotal + "," + client.tax + "," + client.providerName +  "\n";
      }
      element.setAttribute('href', 'data:text/plain;charset=unicode,' + encodeURIComponent(text));
      element.setAttribute('download', "Compras.csv");
    
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

}
