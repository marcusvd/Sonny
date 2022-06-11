import { Component, OnInit } from "@angular/core";

import { ValidatorsService } from '../../../../_shared/helpers/validators.service';
import { ClientCreateService } from "../services/client-create.service";


@Component({
  selector: 'client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css'],
  providers: [ValidatorsService]
})

export class ClientCreateComponent implements OnInit {

  public _arrayOfTypes: string[];

  constructor(
    public _ClientService: ClientCreateService,
  ) { }

  ngOnInit(): void {
    this._ClientService.formClient();
    this._arrayOfTypes = [];
    this._arrayOfTypes.push('PJ', 'PF');

  }


}







