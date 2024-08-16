import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { MonthlyFixedExpensesTrackingDto } from "../../dto/monthly-fixed-expenses-tracking-dto";


@Injectable({ providedIn: 'root' })
export class ViewMonthlyFixedExpensesTrackingService extends BackEndService<MonthlyFixedExpensesTrackingDto>{


  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,

  ) {
    super(_http, environment._MONTH_FIXED_EXPENSES_TRACKING)
  }

  getEntityBackEnd(id: string) {
   return this.loadById$<MonthlyFixedExpensesTrackingDto>('GetFixedExpensesTrackingByIdAllIncluded', id);
  }

  // deleteFakeDisable(id: number) {
  //   if (id == 0) throw new Error('Id não pode ser 0');

  //   const fixedExpensesTracking = new MonthFixedExpensesTrackingDto();
  //   fixedExpensesTracking.id = id;

  //   this.deleteFake$<MonthFixedExpensesTrackingDto>('', fixedExpensesTracking).subscribe(
  //     {
  //       next: () => {
  //         this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
  //       },

  //       error: (error) => {
  //         this._communicationsAlerts.defaultSnackMsg(error, 1);
  //         return false;
  //       }

  //     }
  //   );


  // }

  // update(form: FormGroup) {
  //   const toSave: MonthFixedExpensesTrackingDto = { ...form.value }

  //   this.update$<MonthFixedExpensesTrackingDto>('UpdateFnFixedExpensesTracking', toSave).subscribe({
  //     next: (_cli: MonthFixedExpensesTrackingDto) => {
  //       this._communicationsAlerts.defaultSnackMsg('Pago $', 0, null, 4);
  //       this._router.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-tracking-list`);
  //     },
  //     error: (err) => {
  //       console.log(err)
  //       const erroCode: string = err.error.Message
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })
  // }



}
