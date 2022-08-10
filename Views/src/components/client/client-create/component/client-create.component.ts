import { Component, OnInit } from "@angular/core";
import { ClientCreateService } from "../services/client-create.service";


@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [
    ClientCreateService
  ]
})

export class ClientCreateComponent implements OnInit {


  constructor(
    private _ClientService: ClientCreateService,
  ) {

  }

  get formMain() {
    return this._ClientService.formMainGet;
  }
  save() {
    this._ClientService.save();
  }
  valueDate(){
    return this._ClientService.valueDate();
  }
  get valueDateGet(){
    return this._ClientService.valueDateGet;
  }

  ngOnInit(): void {

    this._ClientService.formMain();
  }


}







