import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';



@Component({
  selector: 'product-dash',
  templateUrl: './product-dash.component.html',
  styleUrls: ['./product-dash.component.css'],
  providers: []
})
export class ProductDashComponent implements OnInit {

  companyId:number = JSON.parse(localStorage.getItem('companyId'));

  @Input() elements: any[] = [
    { "route": `/side-nav/product-dash/add-manufacturer-name/${this.companyId}`, "icon": "note_add", "toolTip":"Cadastrar fabricante e equipamento"},
    { "route": `/side-nav/product-dash/add-product/${this.companyId}`, "icon": "insert_drive_file", "toolTip":"Cadastrar um novo Produto."},
    { "route": `/side-nav/product-dash/list-product/${this.companyId}`, "icon": "list", "toolTip":"Lista todos os produtos."},
    // { "route": `/side-nav/partner-dash/create-eletronic-repair/${this.companyId}`, "icon": "power", "toolTip":"Registrar reparo eletônico terceirizado." },
    // { "route": `/side-nav/partner-dash/create-collect-deliver/${this.companyId}`, "icon": "motorcycle", "toolTip":"Registrar uma corrida." },
  ];





  constructor() {

  }

  ngOnInit(): void {

  }

}
