import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'stock-dash',
  templateUrl: './stock-dash.component.html',
  styleUrls: ['./stock-dash.component.css'],
  providers: []
})
export class StockDashComponent implements OnInit {
  // companyId:number = JSON.parse(localStorage.getItem('companyId'));
  @Input() elements: any[] = [
    { "route": `/side-nav/stock-dash/create-stock/${JSON.parse(localStorage.getItem('companyId'))}`, "icon": "insert_drive_file" },
    { "route": `/side-nav/stock-dash/list-stock/${JSON.parse(localStorage.getItem('companyId'))}`, "icon": "line_weight", "toolTip": "Listar estoque." },
    { "route": "/partner-dash/create-eletronic-repair", "icon": "local_offer" },
    // { "route": "/partner-dash/create-collect-deliver", "icon": "motorcycle" },
  ];






  constructor() {

  }

  ngOnInit(): void {

  }

}
