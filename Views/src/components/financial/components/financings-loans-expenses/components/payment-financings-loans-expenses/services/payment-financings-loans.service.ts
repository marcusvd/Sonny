import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FinancingsLoansExpensesDto } from "../../../dto/financings-loans-expenses-dto";




@Injectable({ providedIn: 'root' })
export class PaymentFinancingsLoansService extends BackEndService<FinancingsLoansExpensesDto>{


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) {
    super(_http, environment._FINANCINGS_LOANS_EXPENSES)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const entity = { id: id };


    this.deleteFake$<any>('', entity).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg(error, 1);
          return false;
        }

      }
    );


  }

  update(form: FormGroup) {

    const toSave: FinancingsLoansExpensesDto = { ...form.value }

    this.update$<FinancingsLoansExpensesDto>('UpdateFinancingsAndLoans', toSave).subscribe({
      next: (_cli: any) => {
        this._communicationsAlerts.defaultSnackMsg('Pago $', 0, null, 4);
        history.back();
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }


}