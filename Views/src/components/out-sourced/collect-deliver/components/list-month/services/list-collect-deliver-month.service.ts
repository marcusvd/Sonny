import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";




@Injectable({ providedIn: 'root' })
export class ListCollectDeliverMonthService extends BackEndService<CollectDeliverDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts
  ) {
    super(_http, environment._CREDIT_CARD_EXPENSES_INVOICES)
  }

  getAllByCardIdAsync(cardId: number) {
   return this.loadById$<CollectDeliverDto>('GetAllByCardIdAsync', cardId.toString());
  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const partner = new CollectDeliverDto();
    partner.id = id;

    this.deleteFake$<CollectDeliverDto>('DeleteFakePartner', partner).subscribe(
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
