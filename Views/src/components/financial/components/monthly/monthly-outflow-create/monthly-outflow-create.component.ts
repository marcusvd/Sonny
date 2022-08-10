import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { environment } from 'src/environments/environment';
import { MonthlyOutFlowDto } from './dto/monthly-outflow-dto';
import { CrudMonthlyOutflow } from './services/crud-monthly-outflow';


@Component({
  selector: 'monthly-out-create',
  templateUrl: './monthly-outflow-create.component.html',
  styleUrls: ['./monthly-outflow-create.component.css']
})
export class MonthlyOutFlowCreateComponent implements OnInit {

  public _formMonthlyOutFlow: FormGroup
  public _startDate = new Date();

  constructor(
    private _FormBuilder: FormBuilder,
    private _SnackBar: MsgOperation,
    private _CrudMonthlyOutflow: CrudMonthlyOutflow,
    public _ValidationMsg: ValidatorsService,
    public _back: NavBackService,
  ) { }

save() {

  const _monthly: MonthlyOutFlowDto = {...this._formMonthlyOutFlow.value};

  this._CrudMonthlyOutflow.add$<MonthlyOutFlowDto>(_monthly)
  .subscribe(_monthlyOutFlow => {

    this._SnackBar.msgCenterTop(`Despesa mensal ${_monthly.name} ${_monthly.amount} Cadastrado com sucesso.`, 0, 5);
    //CLEAN Fields and forms for the next new insertion
    this._ValidationMsg.cleanAfters(['contact', 'address'], this._formMonthlyOutFlow)
  });

}

formMonthlyCharges() {
  this._formMonthlyOutFlow = this._FormBuilder.group({

    name:['',[]],
    institution:['',[]],
    amount:['',[]],
    started:['',[]],
    expiration:['',[]],
    installment:['',[]],
    duplicateurl:['',[]],
    user:['',[]],
    password:['',[]],
    description:['',[]],

  })
}
ngOnInit(): void {
  this.formMonthlyCharges();
}

}
