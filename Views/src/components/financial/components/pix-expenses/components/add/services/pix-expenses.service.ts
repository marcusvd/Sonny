import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { PixExpenseDto } from "../../../dto/pix-expense-dto";


@Injectable()
export class PixExpensesService extends BackEndService<PixExpenseDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http, environment._FN_PIXES_EXPENSES)
  }



  save(form: FormGroup) {

    const toSave: PixExpenseDto = { ...form.value };

    this.add$<PixExpenseDto>(toSave, 'AddPixesExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          this._route.navigateByUrl(`/side-nav/financial-dash/list-pix-expenses`)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }
}
