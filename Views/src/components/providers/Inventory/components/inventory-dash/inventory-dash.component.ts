import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'inventory-dash',
  templateUrl: './inventory-dash.component.html',
  styleUrls: ['./inventory-dash.component.css'],
  providers: []
})
export class InventoryDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/inventory-dash/create-inventory", "icon": "insert_drive_file" },
    // { "route": "/partner-dash/create-eletronic-repair", "icon": "power" },
    // { "route": "/partner-dash/create-collect-deliver", "icon": "motorcycle" },
  ];






  constructor() {

  }

  ngOnInit(): void {

  }

}
