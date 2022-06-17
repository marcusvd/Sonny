import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "src/app/_components/administrative/local/services/service-budget/dto/service-budget-dto";
import { SolutionPriceDto } from "src/app/_components/administrative/local/services/service-budget/dto/solution-price-dto";
import { MatDialog } from "@angular/material/dialog";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";



@Injectable()

export class DatasheetDetailsService extends BackEndService<ServiceBudgetDto, number>{


  private _formMain: FormGroup;
  private _formPriceService: FormGroup;

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _Dialog: MatDialog,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);

  }

  formLoad(s: ServiceBudgetDto) {
    this._formMain = this._Fb.group({
      id: [s.id, []],
      client: [s.client, []],
      clientId: [s.clientId, []],
      entryDate: [s.entryDate, []],
      entryDateOs: [s.entryDateOs, []],
      clientProblems: [s.clientProblems, []],
      visually: [s.visually, []],
      osMake: [s.osMake, []],
      solutionsPrices: this._Fb.array([]),
    })
    this.seeding(s.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formPriceService = this._Fb.group({
      technician: ['', []],
      dateService: [new Date(), []],
      priceService: [0, []],
      technicalSolution: ['', []],
      remote: [false, []],
      authorized: [false, []],
    })

  }


  seeding(loaded: SolutionPriceDto[]) {
    loaded.forEach((s?: SolutionPriceDto) => {
      this.pricesServices.push(this._Fb.group(s));
    })
  }


  get formMain() {
    return this._formMain
  }

  get pricesServices(): FormArray {
    return <FormArray>this._formMain.get('solutionsPrices');
  }


  add() {
    this.pricesServices.push(this.formPricesServices())
  }
  remove(i: number) {
    this.pricesServices.removeAt(i);
  }


  save(id: number) {

    this._formMain.value.id = id;
    console.log(this._formMain.value)
    const toSave: ServiceBudgetDto = { ...this._formMain.value }

    console.log(toSave)

    this.update$<ServiceBudgetDto>(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Orçamento`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);
      },
      (error) => { console.log(error) },
      () => {
        // console.log('complete')
      },

    )
  }





}
