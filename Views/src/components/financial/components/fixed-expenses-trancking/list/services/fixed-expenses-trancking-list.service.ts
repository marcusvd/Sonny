import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FixedExpensesTranckingDto } from "../../dto/fixed-expenses-trancking-dto";


@Injectable()

export class FixedExpensesTranckingService extends BackEndService<FixedExpensesTranckingDto>{

  private _partner: FixedExpensesTranckingDto;
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts

  ) {
    super(_http, environment._PARTNERS)
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new FixedExpensesTranckingDto();
    partner.id = id;

    this.deleteFake$<FixedExpensesTranckingDto>('DeleteFakePartner', partner).subscribe(
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



}
