import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ProductDto } from "src/components/product/dtos/product-dto";
import { ManufacturerFillDto } from "src/components/product/dtos/manufacture-dto";
import { EquipamentFillDto } from "src/components/product/dtos/equipament-fill-dto";
import { SegmentFillDto } from "src/components/product/dtos/segment-dto";



@Injectable()
export class EquipamentCreateService extends BackEndService<EquipamentFillDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  save(form: FormGroup) {

    const toSave = <FormArray>form.get('equipaments');
    const result:EquipamentFillDto[] = [...toSave.value]

    this.addRange$<EquipamentFillDto>(result, 'EquipamentsFillers/AddEquipamentFill').subscribe({
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
export class ManufacturerCreateService extends BackEndService<ManufacturerFillDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }


  save(form: FormGroup) {

    const toSave = <FormArray>form.get('manufacturers');

    const result: ManufacturerFillDto[] = [...toSave.value]

    this.addRange$<ManufacturerFillDto>(result, 'EquipamentsFillers/AddManufacturerFill').subscribe({
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
export class SegmentCreateService extends BackEndService<SegmentFillDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  save(form: FormGroup) {

    const toSave = <FormArray>form.get('segments');

    const result: SegmentFillDto[] = [...toSave.value]

    this.addRange$<SegmentFillDto>(result, 'EquipamentsFillers/AddSegmentFill').subscribe({
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
