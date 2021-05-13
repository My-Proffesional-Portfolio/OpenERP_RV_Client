import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sales-index',
  templateUrl: './sales-index.component.html',
  styleUrls: ['./sales-index.component.css']
})
export class SalesIndexComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToClients(){

    this.router.navigate(['/clients']);
  }

  goToProducts(){

    this.router.navigate(['/products']);
  }

}
