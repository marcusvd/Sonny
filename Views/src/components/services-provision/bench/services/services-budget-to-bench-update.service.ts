import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service.OLD";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "src/components/client/dto/client-dto";
import { ServiceBudgetDto } from "../../budget/dto/service-budget-dto";
@Injectable()
export class ServicesBudgetToBenchUpdate extends BackEndService<ServiceBudgetDto, number>{

  // private _clients: ClientDto[] = [];

  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

  // get clients() {
  //   return this._clients;
  // }

  // loadAllClients() {
  //   this._Http.get(environment._CLIENTS).subscribe(
  //     (clients: ClientDto[]) => {
  //       this._clients = clients;
  //     },
  //     (error) => {
  //       console.log(error)
  //     },
  //     () => {
  //       console.log('complete')
  //     })
  // }


  update(form: FormGroup) {
    const toSave: ServiceBudgetDto = { ...form.value };
    this.update$(toSave).subscribe(() => {
      this._SnackBar.msgCenterTop(`Orçamento Atualizado.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
  }
}
