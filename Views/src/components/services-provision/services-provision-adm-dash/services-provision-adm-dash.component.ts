import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';


@Component({
  selector: 'services-provision-adm-dash',
  templateUrl: './services-provision-adm-dash.component.html',
  styleUrls: ['./services-provision-adm-dash.component.css'],
  providers: []
})
export class ServicesProvisionAdmDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/services-provision-adm-dash/budget-create", "icon": " insert_drive_file" },
    { "route": "/services-provision-adm-dash/technical-bench-list", "icon": "room_service" },
    { "route": "/services-provision-adm-dash/budget-list", "icon": "event_available" },
    // { "route": "/services-provision-adm-dash/bench-list", "icon": "event_note" },
  ];

  constructor() {

  }

  ngOnInit(): void {

  }

}
