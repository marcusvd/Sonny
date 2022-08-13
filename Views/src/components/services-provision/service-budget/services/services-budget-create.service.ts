import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../dto/solution-price-dto";
import { ClientDto } from "src/components/client/dto/client-dto";


@Injectable()

export class ServicesBudgetCreateService extends BackEndService<ServiceBudgetDto, number>{


  private _clients: ClientDto[] = [];
  // private _formPriceService: FormGroup;
  // private _radioValue: string;
  // private _both: boolean;
  // private _pickup: boolean;
  private _send: boolean;
  private _emailField: boolean;


  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,

  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

  // get emailField(): boolean {
  //   return this._emailField
  // }
  // get emailSend(): boolean {
  //   return this._send;
  // }
  // set emailSet(b: boolean) {
  //   this._send = this.emailSend
  // }

 get clients() {
    return this._clients;
  }

  loadAllClients() {
    this._Http.get(environment._CLIENTS).subscribe(
      (clients: ClientDto[]) => {
        this._clients = clients;
        //this.clients.forEach((item: ClientDto)=>{console.log(item.id)})
      },
      (error) => {
        console.log(error)
      },
      () => {
        console.log('complete')
      })
  }




  save(form: FormGroup) {

    let toSave: ServiceBudgetDto = { ...form.value }
      this.add$(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Parceiro`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], form);
      },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }







}
