import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'financial-dash',
  templateUrl: './financial-dash.component.html',
  styleUrls: ['./financial-dash.component.css'],
  providers: []
})
export class FinancialDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/financial-dash/create", "icon": " insert_drive_file" },
  ];


  constructor() {

  }

  ngOnInit(): void {

  }

}
