import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';


@Component({
  selector: 'dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
  providers: []
})
export class BenchBudgetServiceDashComponent implements OnInit {

  companyId: number = JSON.parse(localStorage.getItem('companyId'));


  @Input() elements: any[] = [
    { "route": "/side-nav/bench-budget-service/table-provided-services-prices", "icon": " insert_drive_file" },
    { "route": `/side-nav/bench-budget-service/open-budget/${this.companyId}`, "icon": "room_service" },
    { "route": `/side-nav/bench-budget-service/list-services/${this.companyId}`, "icon": "event_available" },
    // { "route": "/services-provision-adm-dash/bench-list", "icon": "event_note" },
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

}
