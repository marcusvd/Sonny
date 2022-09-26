import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ServiceBenchDto } from 'src/components/services-provision/dtos/service-bench-dto';
import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { ServiceBenchListService } from 'src/components/services-provision/bench/services/service-bench-list.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServicesBudgetListService } from '../../budget/service-budget-list/services/services-budget-list.service';
import { ServiceBudgetToBenchListService } from '../services/service-budget-to-bench-list.service';
import { ServiceBudgetDto } from '../../dtos/service-budget-dto';


@Component({
  selector: 'panel-services-bench',
  templateUrl: './panel-services-bench.component.html',
  styleUrls: ['./panel-services-bench.component.css']
})

export class PanelServicesBenchComponent extends BaseForm implements OnInit {
  private _formChildPriceService: FormGroup;
  // private _budgetAnalysis: string = 'ORÇAMENTO.';

  nServices: number = 0;
  // panelOpenState = false;

  @Input() entities: ServiceBudgetDto[] = [];

  // entityToTab = {};

  constructor(
    // private _ServiceBudgetListServices: ServicesBudgetListService,
    private _serviceBudgetToBenchListService: ServiceBudgetToBenchListService,
    private _ServiceBenchList: ServiceBenchListService,
    private _Fb: FormBuilder
  ) {
    super()
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

  }
  ngOnInit(): void {
    this.formLoad();
  }

}
