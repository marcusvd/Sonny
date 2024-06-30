import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

@Injectable({ providedIn: 'root' })
export class OpenBudgetService extends BackEndService<BudgetServiceDto> {

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
    override _http: HttpClient
  ) {
    super(_http, environment.backEndDoor)
  }
//  companyId: string = JSON.parse(localStorage.getItem('companyId'));
  save(form: FormGroup) {
    let toSave: BudgetServiceDto = { ...form.value }
// console.log(toSave)
    this.add$<BudgetServiceDto>(toSave, 'BudgetsServices/AddBudgetService').subscribe({
      next: () => {
        // this._communicationsAlerts.defaultSnackMsg('', 0, 2);
        this._router.navigateByUrl(`/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}`)
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        // this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }
}
