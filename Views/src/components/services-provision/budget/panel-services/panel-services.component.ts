import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceBenchDto } from 'src/components/services-provision/dtos/service-bench-dto';
import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { ServiceBenchListService } from 'src/components/services-provision/services/bench/service-bench-list.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServicesBudgetListService } from '../service-budget-list/services/services-budget-list.service';

@Component({
  selector: 'panel-services',
  templateUrl: './panel-services.component.html',
  styleUrls: ['./panel-services.component.css']
})

export class PanelServicesComponent extends BaseForm implements OnInit {
  private _formChildPriceService: FormGroup;
  private _budgetAnalysis: string = 'ORÇAMENTO.';

  nServices: number = 0;
  panelOpenState = false;
  entities: ServiceBenchDto[] = [];
  entityToTab = {};
  @Input() money:boolean = false;

  constructor(
    private _ServiceBudgetListServices: ServicesBudgetListService,
    private _ServiceBenchList: ServiceBenchListService,
    private _Fb: FormBuilder
  ) {
    super()
  }
  grabEntityToTab(entity: any) {
    this.entityToTab = entity;
  }

  get getForm() {
    return this.formMain
  }

  get pricesServiices(): FormArray {
    return this.pricesServices
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

  formLoad(serviceBenchDto?: ServiceBenchDto) {
    this.formMain = this._Fb.group({
      id: ['', []],
      client: ['', []],
      clientId: ['', []],
      benchStartedIn: ['', []],
      clientProblems: ['', []],
      status: ['', []],
      visually: ['', []],
      finished: ['', []],
      solutionsPrices: this._Fb.array([]),
    })
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      technician: ['', []],
      dateService: [new Date(), []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      priceService: ['', []],
      remote: [false, []],
      solved: [false, []],
      authorized: [false, []],
    })
  }

  seeding(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
  }

  get dataSource() {
    return this._ServiceBenchList.dataSource;
  }
  save() {

  }
  ngOnInit(): void {
    this.formLoad();
  }

}
