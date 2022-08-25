import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBenchDto } from '../../dtos/service-bench-dto';
import { ServiceBudgetDto } from '../../dtos/service-budget-dto';
import { SolutionPriceDto } from '../../dtos/solution-price-dto';
import { ServiceBenchListService } from '../../services/bench/service-bench-list.service';
import { ServicesBudgetListService } from '../../services/budget/services-budget-list.service';



@Component({
  selector: 'app-service-bench',
  templateUrl: './service-bench.component.html',
  styleUrls: ['./service-bench.component.css']
})
export class ServiceBenchComponent extends BaseForm implements OnInit {

  // private _dataSourceView: ServiceBudgetDto[] = [];
  private _formChildPriceService: FormGroup;
  nServices: number = 0;
  panelOpenState = false;
  public entities: ServiceBenchDto[] = [];
  public entityToTab = {};
  private budgetAnalysis: string = 'ORÇAMENTO.';

  constructor(
    private _ServiceBudgetListServices: ServicesBudgetListService,
    private _ServiceBenchList: ServiceBenchListService,
    private _Fb: FormBuilder
  ) { super() }







  grabEntityToTab(entity: any) {
    this.entityToTab = entity;
  }




  //#region SolutionsPrices


  get getForm() {
    return this.formMain
  }

  get pricesServiices(): FormArray {
    return this.pricesServices
  }





  // get dataSourceView() {
  //   return this._dataSourceView;
  // }

  get pricesServices(): FormArray {
    return <FormArray>this.formMain.get('solutionsPrices');
  }

  add() {
    this.nServices += 1;
    this.pricesServices.push(this.formPricesServices())
  }
  remove(i: number) {
    this.nServices -= 1;
    this.pricesServices.removeAt(i);
  }

  formLoad(s?: ServiceBenchDto) {
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
    // s?.id
    // s?.client
    // s?.clientId
    // s?.benchStartedIn
    // s?.clientProblems
    // s?.status
    // s?.visually
    // s?.finished


    // this.seeding(s?.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      technician: ['', []],
      dateService: [new Date(), []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      solved: [false, []],
      authorized: [false, []],
    })
  }

  seeding(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((s?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(s));
    })
  }

  get dataSource() {
    return this._ServiceBenchList.dataSource;
  }

  ngOnInit(): void {
    this.formLoad();
    this._ServiceBenchList.firstToLoad(this._ServiceBudgetListServices);
    this.dataSource.subscribe((serviceBenchDto: ServiceBenchDto[]) => {
      this.entities = serviceBenchDto;
     }

    )

  }

}
