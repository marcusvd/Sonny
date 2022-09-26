import { Component, EventEmitter, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../../dtos/service-budget-dto';
import { ServiceBenchListComponent } from '../service-bench-list/service-bench-list.component';
import { ServicesBudgetToBenchUpdate } from '../services/services-budget-to-bench-update.service';

@Component({
  selector: 'panel-services-bench',
  templateUrl: './panel-services-bench.component.html',
  styleUrls: ['./panel-services-bench.component.css'],
  providers: [ServicesBudgetToBenchUpdate]
})

export class PanelServicesBenchComponent extends BaseForm implements OnInit, OnChanges {
  private _formChildPriceService: FormGroup;
  // private _budgetAnalysis: string = 'ORÇAMENTO.';

  nServices: number = 0;
  @Input() entity: ServiceBudgetDto;
  // @Input() budgetId: number = 0;
  // panelOpenState = false;

  // @Input() entities: ServiceBudgetDto[] =[];

  // entityToTab = {};

  constructor(
    // private _ServiceBudgetListServices: ServicesBudgetListService,
    // private _serviceBudgetToBenchListService: ServiceBudgetToBenchListService,
    private _servicesBudgetToBenchUpdate: ServicesBudgetToBenchUpdate,
    private _Fb: FormBuilder
  ) {
    super()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.formLoad();

    // console.log(this.budgetId)

    // console.log(this.entity)
    // console.log(changes)



  }
  // grabEntityToTab(entity: any) {
  //   this.entityToTab = entity;
  // }

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

  formLoad() {
    this.formMain = this._Fb.group({
      id: ['', []],
      clientId: ['', []],
      BudgetStartedIn: ['', []],
      visually: ['', []],
      remoteData: ['', []],
      clientProblems: ['', []],
      status: ['Aguardando autorização.', []],
      solutionsPrices: this._Fb.array([]),
    })
  }



  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      technician: ['', []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
    })
  }



  seeding(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
  }

  save() {
    // const toSave:ServiceBudgetDto  = { ...this.formMain.value }
  //  console.log(this.entity)

    // console.log(this.formMain.value)

    this.formMain.patchValue({
      id: this.entity.id,
      clientId: this.entity.clientId,
      client: this.entity.client,
      budgetStartedIn: this.entity.budgetStartedIn,
      visually: this.entity.visually,
      remoteData: this.entity.remoteData,
      clientProblems: this.entity.clientProblems,
      benchStartedIn: this.entity.benchStartedIn,
      status: this.entity.status,
      solutionsPrices: this.entity.solutionsPrices
    })
    // console.log(this.formMain.value)
    // this._servicesBudgetToBenchUpdate.update(this.formMain);
    console.log(this.formMain.value)
  }

  ngOnInit(): void {
    this.formLoad();

  }

}
