import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
    selector: 'customer-dash',
    templateUrl: './customer-dash.component.html',
    styleUrls: ['./customer-dash.component.css'],
    providers: [],
    standalone: false
})
export class CustomerDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/side-nav/customer-dash/create", "icon": " insert_drive_file" },
    { "route": "/side-nav/customer-dash/list", "icon": "list" },
  ];


  constructor() {

  }

  ngOnInit(): void {

  }

}
