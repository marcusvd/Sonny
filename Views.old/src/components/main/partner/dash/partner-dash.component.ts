import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'partner-dash',
  templateUrl: './partner-dash.component.html',
  styleUrls: ['./partner-dash.component.css'],
  providers: []
})
export class PartnerDashComponent implements OnInit {

  companyId:number = JSON.parse(localStorage.getItem('companyId'));

  @Input() elements: any[] = [
    { "route": `/side-nav/partner-dash/create-partner/${this.companyId}`, "icon": "insert_drive_file", "toolTip":"Cadastrar um novo Parceiro."},
    { "route": `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}`, "icon": "power", "toolTip":"Registrar reparo eletônico terceirizado." },
    { "route": `/side-nav/partner-dash/create-collect-deliver/${this.companyId}`, "icon": "motorcycle", "toolTip":"Registrar uma corrida." },
  ];





  constructor() {

  }

  ngOnInit(): void {

  }

}
