import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'partner-dash',
  templateUrl: './partner-dash.component.html',
  styleUrls: ['./partner-dash.component.css'],
  providers: []
})
export class PartnerDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/partner-dash/create-partner", "icon": "insert_drive_file" },
    { "route": "/partner-dash/create-eletronic-repair", "icon": "power" },
    { "route": "/partner-dash/create-collect-deliver", "icon": "motorcycle" },
  ];





  constructor() {

  }

  ngOnInit(): void {

  }

}
