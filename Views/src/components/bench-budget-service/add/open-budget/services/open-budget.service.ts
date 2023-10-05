import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-Service-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";

@Injectable({ providedIn: 'root' })
export class OpenBudgetService extends BackEndService<BudgetServiceDto> {

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    override _http: HttpClient
  ) {
    super(_http, environment.backEndDoor)
  }

  save(form: FormGroup) {
    let toSave: BudgetServiceDto = { ...form.value }

    this.add$<BudgetServiceDto>(toSave, 'BudgetsServices/AddBudgetService').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }
}
