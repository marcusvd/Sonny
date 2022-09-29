import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';


@Component({
  selector: 'panel-services-budget',
  templateUrl: './panel-services-budget.component.html',
  styleUrls: ['./panel-services-budget.component.css'],
  providers: []
})

export class PanelServicesBudgetComponent extends BaseForm implements OnInit {

  private _formChildPriceService: FormGroup;

  nServices: number = 0;

  @Input() entity: ServiceBudgetDto;

  constructor(
    private _servicesBudgetUpdate: ServicesBudgetUpdate,
    private _Fb: FormBuilder
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
    this.nServices += 1;
    this.pricesServices.push(this.formPricesServices())
  }

  removePriceService(i: number) {
    this.nServices -= 1;
    this.pricesServices.removeAt(i);
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
      technician: ['', []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      dateService: ['', []],
      priceService: ['', []],
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
