import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ManufacturerDto } from "../../../dtos/manufacture-dto";
import { SegmentDto } from "../../../dtos/segment-dto";



@Injectable()
// export class EquipamentCreateService extends BackEndService<EquipamentFillDto>{

//   constructor(
//     override _http: HttpClient,
//     private _communicationsAlerts: CommunicationAlerts,
//   ) {
//     super(_http, environment.backEndDoor);
//   }


//   save(form: FormGroup) {

//     const toSave = <FormArray>form.get('equipaments');
//     const result:EquipamentFillDto[] = [...toSave.value]

//     this.addRange$<EquipamentFillDto>(result, 'EquipamentsFillers/AddEquipamentFill').subscribe({
//       next: () => {
//         this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
//         form.reset();
//       },
//       error: (errors) => {
//         this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
//         console.log(errors)
//       }
//     })
//   }


// }
@Injectable()
// export class EquipamentCreateService extends BackEndService<EquipamentFillDto>{

//   constructor(
//     override _http: HttpClient,
//     private _communicationsAlerts: CommunicationAlerts,
//   ) {
//     super(_http, environment.backEndDoor);
//   }


//   save(form: FormGroup) {

//     const toSave = <FormArray>form.get('equipaments');
//     const result:EquipamentFillDto[] = [...toSave.value]

//     this.addRange$<EquipamentFillDto>(result, 'EquipamentsFillers/AddEquipamentFill').subscribe({
//       next: () => {
//         this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
//         form.reset();
//       },
//       error: (errors) => {
//         this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
//         console.log(errors)
//       }
//     })
//   }


// }

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

    this.addRange$<ManufacturerDto>(result, 'EquipamentsFillers/AddManufacturerFill').subscribe({
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
export class SegmentCreateService extends BackEndService<SegmentDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  save(form: FormGroup) {

    const toSave = <FormArray>form.get('segments');

    const result: SegmentDto[] = [...toSave.value]

    this.addRange$<SegmentDto>(result, 'EquipamentsFillers/AddSegmentFill').subscribe({
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
