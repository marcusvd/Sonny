import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/components/administrative/local/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../dto/solution-price-dto";


@Injectable()

export class ServicesBudgetCreateService extends BackEndService<ServiceBudgetDto, number>{

  private _formMain: FormGroup;
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
    private _Fb: FormBuilder
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

  get emailField(): boolean {
    return this._emailField
  }
  get emailSend(): boolean {
    return this._send;
  }
  set emailSet(b: boolean) {
    this._send = this.emailSend
  }
  get pricesServiices(): FormArray {
    return <FormArray>this._formMain.get('solutionsPrices');
  }
  get formGet(): FormGroup {
    return this._formMain;
  }


  save() {

    let toSave: ServiceBudgetDto = { ...this._formMain.value }
      this.add$(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Parceiro`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);
      },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }


  formLoad(): FormGroup {
    return this._formMain = this._Fb.group({
      clientId: ['', []],
      clientProblems: ['', []],
      entryDate: [new Date(), []],
      osMake: [false, []],
      solutionsPrices: this._Fb.array([])

    })
  }




}
