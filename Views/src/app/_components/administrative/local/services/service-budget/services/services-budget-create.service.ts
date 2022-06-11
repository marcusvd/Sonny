import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../dto/solution-price-dto";


@Injectable()

export class ServicesBudgetCreateService extends BackEndService<ServiceBudgetDto, number>{

  private _formMain: FormGroup;
  private _formPriceService: FormGroup;
  private _radioValue: string;
  private _both: boolean;
  private _pickup: boolean;
  private _send: boolean;
  private _emailField: boolean;


  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }







  emailSendOnChange() {


    // return ((<HTMLInputElement>document.getElementById('clientField')).value !== ''
    // || undefined || null && this.send === true ? true: false);

    if ((<HTMLInputElement>document.getElementById('others'))
      .value !== '' || undefined || null && this._send === true) {
      this._emailField = true;
      console.log("Preencha o campo email.")
    }
    if (!this._send) {
      this._emailField = false;
      console.log("Preencha o campo email.")
    }
    // if ((<HTMLInputElement>document.getElementById('clientField')).value !== '' || undefined || null &&

    //   (<HTMLInputElement>document.getElementById('others')).value !== '' || undefined || null) {
    //   console.log("Somente um pode ser preenchido.")

    // }

    //console.log((<HTMLInputElement>document.getElementById('clientField')).value)
    console.log(this._send)
  }
  emailSendOnOthersBlur($event) {

    console.log($event)

    // return ((<HTMLInputElement>document.getElementById('clientField')).value !== ''
    // || undefined || null && this.send === true ? true: false);

    if ((<HTMLInputElement>document.getElementById('others'))
      .value === '' || undefined || null && this._send === true) {
      this._emailField = false;
      console.log("Preencha o campo email.")
    }
    else {
      this._emailField = false;
    }

    // if ((<HTMLInputElement>document.getElementById('clientField')).value !== '' || undefined || null &&

    //   (<HTMLInputElement>document.getElementById('others')).value !== '' || undefined || null) {
    //   console.log("Somente um pode ser preenchido.")

    // }

    //console.log((<HTMLInputElement>document.getElementById('clientField')).value)
    console.log(this._send)
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

  // add() {
  //   this.pricesServiices.push(this.formPricesServices())
  // }
  // removePriceService(i: number) {
  //   this.pricesServiices.removeAt(i);
  // }



  save() {

    let toSave: ServiceBudgetDto = { ...this._formMain.value }
    //toSave.solutionsPrices = handledResult;

    console.log('form', this._formMain.value)
    console.log('toSave', toSave)
    this.add$(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        console.log(srvBudgetDto)
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

  // formPricesServices(): FormGroup {
  //   return this._formPriceService = this._Fb.group({
  //     visually: ['', []],
  //     dateService: [new Date(), []],
  //     technician: ['', []],
  //     priceService: ['', []],
  //     technicalSolution: ['', []],
  //     authorized: [false, []],
  //   })
  // }




}
