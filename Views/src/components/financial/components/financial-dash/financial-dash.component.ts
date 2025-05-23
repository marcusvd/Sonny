import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'financial-dash',
  templateUrl: './financial-dash.component.html',
  styleUrls: ['./financial-dash.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class FinancialDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/side-nav/financial/create", "icon": " insert_drive_file" },
  ];


  constructor() {

  }

  ngOnInit(): void {

  }

}
