import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/services/Purchases/Expenses/expenses.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private expenseService: ExpensesService) { }
  fileToUpload: File = null;
  expenseData: any = null;

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.expenseService.postInvoiceFile(this.fileToUpload)
    .then(data => {
      debugger;
      this.expenseData = {};
      this.expenseData = data;

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
