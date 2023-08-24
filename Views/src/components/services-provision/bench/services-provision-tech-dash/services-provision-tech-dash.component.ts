import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';


@Component({
  selector: 'services-provision-tech-dash',
  templateUrl: './services-provision-tech-dash.component.html',
  styleUrls: ['./services-provision-tech-dash.component.css'],
  providers: []
})
export class ServicesProvisionTechDashComponent implements OnInit {

  @Input() elements: any[] = [
    // { "route": "/services-provision-dash/budget-create", "icon": " insert_drive_file" },
    { "route": "/side-nav/services-provision-tech-dash/technical-bench-list", "icon": "room_service" },
    // { "route": "/services-provision-dash/budget-list", "icon": "event_available" },
    { "route": "/side-nav/services-provision-tech-dash/bench-list", "icon": "event_note" },
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

}
