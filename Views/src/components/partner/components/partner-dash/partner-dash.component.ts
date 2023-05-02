import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'partner-dash',
  templateUrl: './partner-dash.component.html',
  styleUrls: ['./partner-dash.component.css'],
  providers: []
})
export class PartnerDashComponent implements OnInit {

  @Input() elements: any[] = [
    { "route": "/side-nav/partner-dash/create-partner", "icon": "insert_drive_file", "toolTip":"Cadastrar um novo Parceiro."},
    { "route": "/side-nav/partner-dash/create-eletronic-repair", "icon": "power", "toolTip":"Registrar reparo eletônico terceirizado." },
    { "route": "/side-nav/partner-dash/create-collect-deliver", "icon": "motorcycle", "toolTip":"Registrar uma corrida." },
  ];





  constructor() {

  }

  ngOnInit(): void {

  }

}
