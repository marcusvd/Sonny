import { Component, OnInit } from "@angular/core";

import { ValidatorsService } from '../../../../../_shared/helpers/form-validators.service';
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

  ngOnInit(): void {

    this._ClientService.formMain();
  }


}







