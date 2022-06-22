import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../dto/solution-price-dto";


@Injectable()

export class ServicesBudgetInfoEditService extends BackEndService<ServiceBudgetDto, number>{

  private _formMain: FormGroup;
  private _formPriceService: FormGroup;
  private _radioValue: string;
  private _both: boolean;
  private _pickup: boolean;
  private _send: boolean;
  private _osMakeCheck: boolean;
  private _emailField: boolean;
  private _total: number = 0;

  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }

  get emailSend(): boolean {
    return this._send;
  }
  get osMakeCheck(): boolean {
    return this._send;
  }
  get pricesServices(): FormArray {
    return <FormArray>this._formMain.get('solutionsPrices');
  }
  get pricesCalc(): number {

    let nResult: number = 0;
    let pArray: SolutionPriceDto[] =
      this._formMain.get('solutionsPrices').value as SolutionPriceDto[];

    let nPrices: number[] = pArray.map(x => x.priceService);
    nPrices

    nPrices.forEach((n) => {
      nResult += Number(n);
    })

    return nResult;

  }

  loadCalcs(loaded: SolutionPriceDto[]): number {
    const prices: number[] = loaded.map(x => x.priceService)
    prices.forEach((p: number) => {
      this._total += p;
    })
    const result = this._total;
    return result;
  }
  loadNServices(loaded: SolutionPriceDto[]): number {
    const prices: number[] = loaded.map(x => x.priceService)
    prices.forEach((p: number) => {
      this._total += p;
    })
    const result = this._total;
    return result;
  }


  get formGet(): FormGroup {
    return this._formMain;
  }

  add() {
    this.pricesServices.push(this.formPricesServices())
  }


  remove(i: number) {
    this.pricesServices.removeAt(i);
  }

  formMain(loaded: ServiceBudgetDto) {
    this._formMain = this._Fb.group({
      client: [loaded.client, []],
      clientId: [loaded.clientId, []],
      entryDate: [loaded.entryDate, []],
      entryDateOs: [loaded.entryDateOs, []],
      clientProblems: [loaded.clientProblems, []],
      status: [loaded.status, []],
      visually: [loaded.visually, []],
      osMake: [loaded.osMake, []],
      solutionsPrices: this._Fb.array([]),
    })

    this.seeding(loaded.solutionsPrices);

  }

  formPricesServices(): FormGroup {
    return this._formPriceService = this._Fb.group({
      technician: ['', []],
      dateService: [new Date(), []],
      priceService: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      fixed: [false, []],
      authorized: [false, []],
      comment: ['', []],
    })
  }

  seeding(loaded: SolutionPriceDto[]) {
    loaded.forEach((item: SolutionPriceDto) => {
      this.pricesServices.push(this._Fb.group(item))
    })

  }

  save(id: number) {

    this._formMain.value.id = id;
    const toSave: ServiceBudgetDto = { ...this._formMain.value }
    console.log(this._formMain.value)
    this.update$<ServiceBudgetDto>(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Orçamento`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);
      },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },

    )
  }






}
