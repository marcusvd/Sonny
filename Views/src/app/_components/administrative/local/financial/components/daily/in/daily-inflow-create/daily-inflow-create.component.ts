import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto';
//import { ClientCrudService } from 'src/app/_components/administrative/client/services/client-crud.service';
import { InflowCrudService } from '../services/inflow-crud.service';
import { TypePaymentDto } from 'src/app/_components/administrative/local/financial/components/type-payment/dto/type-payment-dto';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { CheckingAccountDto } from '../../../checking-account/dto/checking-account-dto';
import { DailyInFlowDto } from '../dto/daily-in-flow-dto';
import { CheckingAccountService } from '../../../checking-account/services/checking-account.service';
//import { ClientCrudService } from 'src/app/_components/administrative/client/services/client-create-crud.service';
import { CrudCardService } from '../../../card/services/crud-card.service';
import { TypePaymentCrudService } from 'src/app/_components/administrative/local/providers/supplier/services/supplier-crud.service';



const moment = _moment;



@Component({
  selector: 'inflow-create',
  templateUrl: './daily-inflow-create.component.html',
  styleUrls: ['./daily-inflow-create.component.css'],
  providers: [CrudCardService]
})
export class DailyInflowCreateComponent implements OnInit {



  constructor(
    private _PaymentCrudT: TypePaymentCrudService,
    protected _CheckingAccountService: CheckingAccountService,
    private _InServices: InflowCrudService,
  ) { }


  get form(): FormGroup {
    return this._InServices.formGet
  }
  get clients(): ClientDto[] {
    return this._InServices.clients;
  }
  get cckAcc(): CheckingAccountDto[] {
    return this._InServices.cckAcc;
  }
  get typePay(): TypePaymentDto[] {
    return this._InServices.typePay;
  }


save(){
  this._InServices.save();
}

  get beginDate(): Date{
    return this._InServices.startDate;
  }

  ngOnInit(): void {
      this._InServices.callAll();
   this._InServices.formLoad();

  }

}
