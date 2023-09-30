import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ProductDto } from "../../dtos/product-dto";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { EquipamentTypeDto } from "../../dtos/equipament-type-dto";



@Injectable()
export class EquipamentCreateService extends BackEndService<EquipamentTypeDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  save(form: FormGroup) {

    const toSave = <FormArray>form.get('equipaments');
    const result:EquipamentTypeDto[] = [...toSave.value]

    this.addRange$<EquipamentTypeDto>(result, 'Equipaments/AddEquipaments').subscribe({
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

@Injectable()
export class ManufacturerCreateService extends BackEndService<ManufacturerDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  save(form: FormGroup) {

    const toSave = <FormArray>form.get('manufacturers');

    const result: ManufacturerDto[] = [...toSave.value]

    this.addRange$<ManufacturerDto>(result, 'Manufacturers/AddManufacturers').subscribe({
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
