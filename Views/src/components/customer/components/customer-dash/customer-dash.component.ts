import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';


@Component({
  selector: 'customer-dash',
  templateUrl: './customer-dash.component.html',
  styleUrls: ['./customer-dash.component.css'],
  providers: []
})
export class CustomerDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/customer-dash/create", "icon": " insert_drive_file" },
  ];


  constructor() {

  }

  ngOnInit(): void {

  }

}
