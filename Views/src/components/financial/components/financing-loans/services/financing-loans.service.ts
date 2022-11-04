import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { FinancingLoansDto } from "../dto/financing-loans-dto";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { FormGroup } from "@angular/forms";
import { supportsScrollBehavior } from "@angular/cdk/platform";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FinancingLoansService extends BackEndService<FinancingLoansDto, number>
{
  constructor(
    protected _http: HttpClient,
    private _SnackBar: MsgOperation,
  ) {
    super(_http, environment._MONTHLYOUTFLOW)
  }



  save(form: FormGroup) {
    const resultReturn = new BehaviorSubject<boolean>(false)

    const toSave: FinancingLoansDto = { ...form.value };

    this.add$<FinancingLoansDto>(toSave)
      .subscribe(_monthlyOutFlow => {
        this._SnackBar.msgCenterTop(`Despesa mensal ${toSave.name} ${toSave.amount} Cadastrado com sucesso.`, 0, 5);
        resultReturn.next(true);
        //CLEAN Fields and forms for the next new insertion
        // this._ValidationMsg.cleanAfters(['contact', 'address'], this.formMain)
      });
    return resultReturn;
  }

}
