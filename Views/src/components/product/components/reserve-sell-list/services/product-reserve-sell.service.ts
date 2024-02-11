import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { QuantityDto } from "../../../dtos/quantity-dto";
import { TrackingDto } from "../../../dtos/tracking-dto";


@Injectable()
export class ProductReserveSellService extends BackEndService<QuantityDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  save(entities: QuantityDto[]) {

    this.updateRange$<QuantityDto>(entities, 'quantitiesProduct/UpdateQuantitiesRangeAsync').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 6, 2, 'top', 'center');
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        console.log(errors)
      }
    })
  }

  saveTraking(entities: TrackingDto[]) {

    this.addRange$<TrackingDto>(entities, 'Products/AddProductSoldTrakingAsync').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 6, 2, 'top', 'center');
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        console.log(errors)
      }
    })
  }



}

