import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ItemDto } from "src/components/product/dtos/item-dto";



@Injectable()
export class ItemCreateUpdateService extends BackEndService<ItemDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  save(form: FormGroup) {

    const toSave: ItemDto = { ...form.value };
    console.log(toSave)
    this.update$<ItemDto>('ItemsFillers/UpdateAddItemFillAsync', toSave, toSave.companyId).subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        console.log(errors)
      }
    })
  }


}
