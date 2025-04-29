import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';



@Component({
  selector: 'out-sourced-dash',
  templateUrl: './out-sourced-dash.component.html',
  styleUrls: ['./out-sourced-dash.component.css'],
  standalone: true,
  imports:[
    RouterModule
  ],
  providers: [ ]
})
export class OutsourcedDashComponent implements OnInit {

  // companyId:number = JSON.parse(localStorage.getItem('companyId'));

  // @Input() elements: any[] = [
  //   { "route": `/side-nav/partner-dash/create-partner/${this.companyId}`, "icon": "insert_drive_file", "toolTip":"Cadastrar um novo Parceiro."},
  //   { "route": `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}`, "icon": "power", "toolTip":"Registrar reparo eletônico terceirizado." },
  //   { "route": `/side-nav/partner-dash/create-collect-deliver/${this.companyId}`, "icon": "motorcycle", "toolTip":"Registrar uma corrida." },
  // ];





  constructor() {

  }

  ngOnInit(): void {

  }

}
