import { Component, Input, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/Purchases/Expenses/expenses.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  processing: boolean;
  selectedProvider: any;
  newProvider: {name: string, rfc: string, address: string, email: string};

  constructor(private expenseService: ExpensesService) { }
  fileToUpload: FileList;
  expenseData: any[] = [];
  errorMessage: string = "";
  canDownload : boolean = false;
  xmlMode: boolean = true;
  ticketMode: boolean =  false
  providerExistMode:boolean = true;
  newProviderMode: boolean = false;

  newExpense: {items: any[], selectedProvider: any, newProvider: any, expenseDate: Date, totalAmount: number, taxAmount: number, subTotalAmount : number};
  
  newExpenseItem: any;
  expenseDate: Date = new Date();

  providersList: any[] = [];

  @Input()
  expense: any;

  ngOnInit(): void {
    debugger;
    if (this.expense !== undefined)
    {
      this.expenseService.getExpenseDetail(this.expense.id).subscribe((data: any)=> {
            debugger;
            this.expenseData = [];
            this.expenseData.push(data);   
            this.canDownload =  true;
      
          },(errorEvent) => {
              debugger;
              var e = errorEvent;
              // if (errorEvent.status == 401)
              // {
              //   this.authService.logout();
              //   this.router.navigate(['/login']);
              // }
            });
    }

    this.newExpense = {items: [], selectedProvider : {}, newProvider: {}, expenseDate: new Date(), totalAmount: 0, taxAmount: 0, subTotalAmount : 0};
    this.newExpense.items = [];
    this.newExpenseItem = {productName : "", quantity : 1, tax: 0, total: 0, price: 0}
    this.newProvider = {name: "", rfc: "", address: "", email: ""}
  }

  downloadCFDI() {

    this.expenseService.downloadExpenseCFDI(this.expenseData[0]);

  }


  changeMode(){

    this.xmlMode = !this.xmlMode;
    this.ticketMode = !this.ticketMode;
    if (this.ticketMode){
      this.expenseService.getCompanyProviders().subscribe((data: any)=> {
        debugger;
        this.providersList = data;
        this.selectedProvider = this.providersList[0];
        this.newExpense.selectedProvider = this.selectedProvider;
  
      },(errorEvent) => {
          debugger;
          var e = errorEvent;
          // if (errorEvent.status == 401)
          // {
          //   this.authService.logout();
          //   this.router.navigate(['/login']);
          // }
        });
      
    }

  }

  handleFileInput(files: FileList) {
    this.processing =  true;
    this.fileToUpload = files;

    this.expenseService.postInvoiceFile(this.fileToUpload)
    .then(data => {
      debugger;
      if (data.errorMessages != undefined && data.errorMessages.length > 0 )
      {
        this.errorMessage = "Ha ocurrido un error en el sistema: " + data.errorMessages[0];
        this.processing = false;
        return;

      }

      this.expenseData = [];
      this.expenseData = data;
      this.processing = false;

    })
    .catch(error => console.log('error', error));;
    // .subscribe((data: any)=> {
    //   debugger;
    //   this.expenseData = {};
    //   this.expenseData = data;


    // },(errorEvent) => {
    //     debugger;
    //     var e = errorEvent;
    //     // if (errorEvent.status == 401)
    //     // {
    //     //   this.authService.logout();
    //     //   this.router.navigate(['/login']);
    //     // }
    //   });

  }

  addNewItem (){

    if(this.newExpenseItem.productName.trim() === "" || this.newExpenseItem.total === 0)
    return;

    this.newExpense.items.push(this.newExpenseItem);
    this.newExpenseItem = {productName : "", quantity : 1, tax: 0, total: 0, price: 0}

    this.newExpense.totalAmount = this.newExpense.items.reduce((a, b) => +a + +b.total, 0);
    this.newExpense.taxAmount = this.newExpense.items.reduce((a, b) => +a + +b.tax, 0);
    this.newExpense.subTotalAmount = this.newExpense.items.reduce((a, b) => +a + (+b.price *b.quantity), 0);
    
  }

  updatePrice(event){
    debugger;
    this.newExpenseItem.tax = (this.newExpenseItem.quantity * event) * 0.16;
    this.newExpenseItem.total = (this.newExpenseItem.quantity * event) + this.newExpenseItem.tax;

  }

  updateQuantity(event){
    debugger;
    this.newExpenseItem.tax = (event * this.newExpenseItem.price) * 0.16;
    this.newExpenseItem.total = (event * this.newExpenseItem.price) + this.newExpenseItem.tax;

  }

  deleteNewItemByIndex(index: number){

    this.newExpense.items.splice(index, 1);
    this.newExpense.totalAmount = this.newExpense.items.reduce((a, b) => +a + +b.total, 0);;
    this.newExpense.taxAmount = this.newExpense.items.reduce((a, b) => +a + +b.tax, 0);
    this.newExpense.subTotalAmount = this.newExpense.items.reduce((a, b) => +a + (+b.price *b.quantity), 0);

  }

  providerMode(){

    this.providerExistMode = !this.providerExistMode;
    this.newProviderMode = !this.newProviderMode;
  }
  
  addManualExpense (){
    debugger;
    if (this.providerExistMode){
      this.newExpense.selectedProvider = this.selectedProvider;
      this.newExpense.newProvider = null;
    }
    
    if (this.newProviderMode){
     this.newExpense.newProvider = this.newProvider;
      this.newExpense.selectedProvider = null;
    }

    if (!this.newProvider && !this.selectedProvider)
     return;

    if (this.newExpense.items.length === 0)
     return;


     this.processing = true;
     this.expenseService.addSingleExpenseNoCFDI(this.newExpense).subscribe((data: any)=> {
      debugger;
      if (data.errorMessages != undefined && data.errorMessages.length > 0 )
      {
        this.errorMessage = "Ha ocurrido un error en el sistema: " + data.errorMessages[0];
        this.processing = false;
        return;

      }

      this.expenseData = [];
      this.expenseData = data;
      this.processing = false;

    },(errorEvent) => {
        debugger;
        var e = errorEvent;
        this.processing = false;
        // if (errorEvent.status == 401)
        // {
        //   this.authService.logout();
        //   this.router.navigate(['/login']);
        // }
      });

  }

  manageSelectedProvider(event)
  {
    this.newExpense.selectedProvider  = this.selectedProvider;

    
  }


  manageExpenseDate(event){

    this.newExpense.expenseDate = event;


  }
  // saveFile()
  // {
  //   this.expenseService.postInvoiceFile(this.fileToUpload).subscribe((data: any)=> {
  //     debugger;
  //     this.expenseData = {};
  //     this.expenseData = data;


  //   },(errorEvent) => {
  //       debugger;
  //       var e = errorEvent;
  //       // if (errorEvent.status == 401)
  //       // {
  //       //   this.authService.logout();
  //       //   this.router.navigate(['/login']);
  //       // }
  //     });
  // }

}
