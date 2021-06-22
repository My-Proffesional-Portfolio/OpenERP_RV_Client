import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor() { }

  @Input()
  dataPie: any;

  @Input()
  titlePie : string = "Compras por proveedor";

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

  typePie : string  = 'PieChart';

  ngOnInit(): void {
  
  }

}
