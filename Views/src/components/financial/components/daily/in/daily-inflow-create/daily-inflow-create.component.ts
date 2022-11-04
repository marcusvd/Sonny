import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
import { SupplierDto } from 'src/components/providers/supplier/dto/supplier-dto';
import { ClientDto } from 'src/components/client/dto/client-dto';
//import { ClientCrudService } from 'src/components/administrative/client/services/client-crud.service';
import { InflowCrudService } from '../services/inflow-crud.service';
import { TypePaymentDto } from 'src/components/financial/dto/type-payment-dto';
import { CheckingAccountService } from '../../../../services/checking-account.service';
import { TypePaymentCrudService } from 'src/components/providers/supplier/services/supplier-crud.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CheckingAccountDto } from 'src/components/financial/dto/checking-account-dto';



const moment = _moment;



@Component({
  selector: 'inflow-create',
  templateUrl: './daily-inflow-create.component.html',
  styleUrls: ['./daily-inflow-create.component.css'],
  providers: []
})
export class DailyInflowCreateComponent extends BaseForm implements OnInit {

  title: string = 'FINANCEIRO';
  subTitle: string = 'Receita';

    constructor(
      private _PaymentCrudT: TypePaymentCrudService,
      protected _CheckingAccountService: CheckingAccountService,
      private _InServices: InflowCrudService,
      private _Fb: FormBuilder,
      override _validatorsService: ValidatorsService,
       override _breakpointObserver: BreakpointObserver,
      ) { super(_validatorsService, _breakpointObserver) }

  get getServiceBudget() {
  return this._InServices.getServiceBudget;
}

  get form(): FormGroup {
  return this.formMain
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
  this._InServices.save(this.formMain);
}

  get beginDate(): Date{
  return this._InServices.startDate;
}

formLoad() {
  return this.formMain = this._Fb.group({
    today: ['', []],
    clientid: ['', []],
    typepaymentid: ['', []],
    checkingaccountid: ['', []],
    service: ['', []],
    amount: ['', []],
    description: ['', []],

  })
}

ngOnInit(): void {
  // this._InServices.callAll();
  this.formLoad();
  this._InServices.callAll();

}

}
