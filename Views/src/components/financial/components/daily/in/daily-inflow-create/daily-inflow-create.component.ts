import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import * as _moment from 'moment';
import { environment } from 'src/environments/environment';
import { SupplierDto } from 'src/components/providers/supplier/dto/supplier-dto';
import { ClientDto } from 'src/components/client/dto/client-dto';
//import { ClientCrudService } from 'src/components/administrative/client/services/client-crud.service';
import { InflowCrudService } from '../services/inflow-crud.service';
import { TypePaymentDto } from 'src/components/financial/dto/type-payment-dto';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { CheckingAccountDto } from '../../../../dto/checking-account-dto';
import { DailyInFlowDto } from '../dto/daily-in-flow-dto';
import { CheckingAccountService } from '../../../../services/checking-account.service';
//import { ClientCrudService } from 'src/components/administrative/client/services/client-create-crud.service';
import { CrudCardService } from '../../../card/services/crud-card.service';
import { TypePaymentCrudService } from 'src/components/providers/supplier/services/supplier-crud.service';
import { ServicesBudgetListService } from 'src/components/services-provision/service-budget/services/services-budget-list.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';



const moment = _moment;



@Component({
  selector: 'inflow-create',
  templateUrl: './daily-inflow-create.component.html',
  styleUrls: ['./daily-inflow-create.component.css'],
  providers: [CrudCardService]
})
export class DailyInflowCreateComponent extends BaseForm implements OnInit {



  constructor(
    private _PaymentCrudT: TypePaymentCrudService,
    protected _CheckingAccountService: CheckingAccountService,
    private _InServices: InflowCrudService,
    private _Fb: FormBuilder,
  ) { super() }

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
