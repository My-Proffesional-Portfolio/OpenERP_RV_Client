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
  modal : NgbModalRef;
  itemsPerPage: number = 10;
  currentPage: number = 0;
  totalPages: number;

  public isCollapsed = true;

  constructor(private expenseService: ExpensesService, 
    private router : Router, 
    private authService: AuthenticationService,
    private modalService: NgbModal,
    private fileService : FilesService,
    private pagerService : PagerService) { }
  
    processing: boolean;
    expensesData: any;
    closeResult = '';
    selectedClient: any;
    newClients: any[] = [];
    itemsPerPageOptionValue: Array<PaginationModel.IItemsPerPage>;
    selectedItemPerPageOption: PaginationModel.IItemsPerPage;
    viewPageLinks: number[];
    totalItems: number;

  ngOnInit(): void {
    this.itemsPerPageOptionValue = this.pagerService.getItemPerPageOptions();
    this.selectedItemPerPageOption = this.itemsPerPageOptionValue[0];
    this.getExpenses();
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
    this.expenseService.getExpenses(this.currentPage, this.itemsPerPage).
    subscribe((data: any)=> {
      debugger;
      this.expensesData = data;
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

  openBatchLoad(content) {


    this.modal =  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((e) => {
       console.log("dialogo cerrado")
   });  
   }

   resetSearch()
   {
    this.modal.close();
    this.currentPage = 0;
    this.getExpenses();

   }

}
