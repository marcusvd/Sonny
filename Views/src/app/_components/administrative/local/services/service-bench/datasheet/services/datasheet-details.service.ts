import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "src/app/_components/administrative/local/services/service-budget/dto/service-budget-dto";
import { SolutionPriceDto } from "src/app/_components/administrative/local/services/service-budget/dto/solution-price-dto";
import { MatDialog } from "@angular/material/dialog";



@Injectable()

export class DatasheetDetailsService extends BackEndService<ServiceBudgetDto, number>{


  private _mainForm: FormGroup;
  private _formPriceService: FormGroup;

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _Dialog: MatDialog,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
 
  }

  formPrincipal(): FormGroup {
    return this._mainForm = this._Fb.group({
      equipament:['',[]],
      manufacturer:['',[]],
      model:['',[]],
      collected: [false, []],
      solutionsPrices: this._Fb.array([this.formPricesServices()])

    })
  }

  formPricesServices(): FormGroup {
    return this._formPriceService = this._Fb.group({
      visually: ['', []],
      dateService: [new Date(), []],
      technician: ['', []],
      priceService: ['', []],
      technicalSolution: ['', []],
      authorized: [false, []],
    })
  }



  // mainForm() {
  //   return this._mainForm = this._Fb.group({
  //     equipament:['',[]],
  //     manufacturer:['',[]],
  //     model:['',[]],
  //     collected: [false, []],
  //     solutionsPrices: this._Fb.array([]),
  //   })
  // }

  get formMain() {
    return this._mainForm
  }

  get pricesServiices(): FormArray {
    return <FormArray>this._mainForm.get('solutionsPrices');
  }


  add() {
    this.pricesServiices.push(this.formLoad())
  }
  remove(i: number) {
    this.pricesServiices.removeAt(i);
  }

  formLoad(): FormGroup {
    return this._formPriceService = this._Fb.group({
      visually: ['', []],
      dateService: [new Date(), []],
      technician: ['', []],
      priceService: ['', []],
      technicalSolution: ['', []],
      authorized: [false, []],
    })
  }

  loadControls(){
    this._mainForm = this._Fb.group({})
  }



}
