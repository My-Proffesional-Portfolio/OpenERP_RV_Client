import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchases-index',
  templateUrl: './purchases-index.component.html',
  styleUrls: ['./purchases-index.component.css']
})
export class PurchasesIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLoadExpenseCFDI (){

    this.router.navigate(['/upload']);
  }

  gotoExpenseList (){

    this.router.navigate(['/expenses']);
  }

}