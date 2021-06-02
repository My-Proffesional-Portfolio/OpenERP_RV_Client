import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/Purchases/Expenses/expenses.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  processing: boolean;

  constructor(private expenseService: ExpensesService) { }
  fileToUpload: FileList;
  expenseData: any[] = [];
  errorMessage: string = "";

  ngOnInit(): void {
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
