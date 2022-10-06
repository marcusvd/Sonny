import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';


import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { DialogQuizComponent } from 'src/shared/components/dialog-quiz/dialog-quiz.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';
import { SolutionsPricesServices } from '../services/solutions-prices.service';



@Component({
  selector: 'panel-services-budget',
  templateUrl: './panel-services-budget.component.html',
  styleUrls: ['./panel-services-budget.component.css'],
  providers: [SolutionsPricesServices]
})

export class PanelServicesBudgetComponent extends BaseForm implements OnInit {

  private _formChildPriceService: FormGroup;

  nServices: number = 0;

  @Input() entity: ServiceBudgetDto;

  constructor(
    private _servicesBudgetUpdate: ServicesBudgetUpdate,
    private _solutionsPricesServices: SolutionsPricesServices,
    private _Fb: FormBuilder,
  ) {
    super()
  }

  get getForm() {
    return this.formMain
  }

  get pricesServices(): FormArray {
    return <FormArray>this.formMain.get('solutionsPrices');
  }

  addPriceService() {
    // this.nServices += 1;
    // if (this.solutionPricesArray.length != 0) {
    //   this.nServices = this.solutionPricesArray.length;
    // }
    this.pricesServices.push(this.formPricesServices())
  }

  removePriceService(solutionPriceForm: FormGroup, indexArrayTemplate?:number) {

    const solutionPrice: SolutionPriceDto = { ...solutionPriceForm.value }

    if (solutionPrice.id) {
      this._solutionsPricesServices.dialogManager(solutionPrice);
      // this.nServices -= 1;

      // if (this.solutionPricesArray.length != 0) {
      //   this.nServices = this.solutionPricesArray.length;
      // }
      // this.pricesServices.removeAt(indexArrayTemplate);
    }
    else{
      this.pricesServices.removeAt(indexArrayTemplate);
    }
  }

  get solutionPricesArray() {
    return this.formMain.get('solutionsPrices').value as SolutionPriceDto[];
  }

  get numbersOfServicesObservable() {
    return of(this.solutionPricesArray.length)
  }

  get numbersOfServices() {

    this.numbersOfServicesObservable.subscribe((total: number) => {
      return this.nServices = total;
    })
    return this.nServices
  }

  pricesArrayNumber() {
    return this.solutionPricesArray.map((prices) => prices.priceService);
  }

  amountPrices() {
    const sum = this.pricesArrayNumber().reduce((total, value) => {
      return total + value;
    }, 0)
    return sum;
  }

  formLoad() {
    this.formMain = this._Fb.group({
      id: [this.entity.id, []],
      clientId: [this.entity.clientId, []],
      budgetStartedIn: [this.entity.budgetStartedIn, []],
      visually: [this.entity.visually, []],
      remoteData: [this.entity.remoteData, []],
      clientProblems: [this.entity.clientProblems, []],
      status: [this.entity.status, []],
      finished: ['', []],
      solutionsPrices: this._Fb.array([])
    })
    this.seedingForm(this.entity.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      dateService: [new Date(), []],
      technician: ['RESPONSÁVEL PELO REPARO', []],
      priceService: ['', []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      approved: [false, []],
      authorized: [false, []],
    })
  }

  seedingForm(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
    this.nServices = loaded.length;
  }

  save() {
    this._servicesBudgetUpdate.update(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
