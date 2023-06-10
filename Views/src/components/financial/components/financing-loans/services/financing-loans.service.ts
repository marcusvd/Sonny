import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { FinancingLoanDto } from "../dto/financing-loan-dto";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { UntypedFormGroup } from "@angular/forms";
import { supportsScrollBehavior } from "@angular/cdk/platform";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class FinancingLoansService extends BackEndService<FinancingLoanDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._FINANCINGS_LOANS)
  }


  save(form: UntypedFormGroup) {
    const toSave: FinancingLoanDto = { ...form.value };

    this.add$<FinancingLoanDto>(toSave, '').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }

  // save(form: FormGroup) {
  //   const resultReturn = new BehaviorSubject<boolean>(false)

  //   const toSave: FinancingLoanDto = { ...form.value };

  //   this.add$<FinancingLoanDto>(toSave)
  //     .subscribe(_monthlyOutFlow => {
  //       this._SnackBar.msgCenterTop(`Despesa mensal ${toSave.name} ${toSave.value} Cadastrado com sucesso.`, 0, 5);
  //       resultReturn.next(true);
  //       //CLEAN Fields and forms for the next new insertion
  //       // this._ValidationMsg.cleanAfters(['contact', 'address'], this.formMain)
  //     });
  //   return resultReturn;
  // }

}
