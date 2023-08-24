import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';


@Component({
  selector: 'customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.css'],
  providers: []
})
export class CustomerDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/side-nav/customer-dash/create", "icon": " insert_drive_file" },
    { "route": "/side-nav/customer-dash/list", "icon": " list" },
  ];


  constructor() {

  }

  ngOnInit(): void {

  }

}
