import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FixedExpensesTrackingDto } from "../../dto/fixed-expenses-tracking-dto";


@Injectable({providedIn:'root'})
export class PayFixedBillsService extends BackEndService<FixedExpensesTrackingDto>{


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._FN_FIXED_EXPENSES_TRACKING)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fixedExpensesTracking = new FixedExpensesTrackingDto();
    fixedExpensesTracking.id = id;

    this.deleteFake$<FixedExpensesTrackingDto>('', fixedExpensesTracking).subscribe(
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

    const toSave: FixedExpensesTrackingDto = { ...form.value }

    this.update$<FixedExpensesTrackingDto>('UpdateFnFixedExpensesTracking', toSave).subscribe({
      next: (_cli: FixedExpensesTrackingDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0);
      },
      error: (err) => {
        console.log(err)
        const erroCode: string = err.error.Message
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })



  }


}
