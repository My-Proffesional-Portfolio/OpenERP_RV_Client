import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  constructor() { }

  @Input()
  dataBar : any;

  @Input()
  titleBar : string = "Montos x proveedor";


  typeBar : string  = 'ColumnChart';

  options = {
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true,
    width: 500,
    height: 350,
    hAxis: { format: 'currency' },
    titleTextStyle: {
      fontSize: 18, // 12, 18 whatever you want (don't specify px)
    }
  };


  ngOnInit(): void {
  }

}
