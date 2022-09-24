import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, OnInit, QueryList, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Observable } from 'rxjs';
import { TabGComponent } from 'src/shared/components/tab-g/component/tab-g.component';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../../../../dtos/service-budget-dto';
import { SolutionPriceDto } from '../../../../dtos/solution-price-dto';
import { ServiceBenchListService } from '../../../../services/bench/service-bench-list.service';
import { ServicesBudgetListService } from '../../services/services-budget-list.service';

@Component({
  selector: 'service-budget-list',
  templateUrl: './service-budget-list.component.html',
  styleUrls: ['./service-budget-list.component.css']

})
export class ServiceBudgetListComponent extends BaseForm implements OnInit {


  private _formChildPriceService: FormGroup;

  titleToExpansion: string[] = [];
  nameOfTabs: string[] = ['Cliente', 'Técnico'];
  descriptionToExpansion: Date[] = [];

  nServices: number = 0;
  indexTabContentField: number = 0;
  panelOpenState = false;
  public entities: Observable<ServiceBudgetDto>[] = [];
  public entityToTab = {};

  constructor(
    private _ServiceBudgetListServices: ServicesBudgetListService,
    // private _ServiceBenchList: ServiceBenchListService,
    private _Fb: FormBuilder
  ) { super() }




  get getForm() {
    return this.formMain
  }

  get pricesServices(): FormArray {
    return this.formMain.get('solutionsPrices') as FormArray;
  }

  add() {
    this.nServices += 1;
    this.pricesServices.push(this.formPricesServices())
  }
  remove(i: number) {
    this.nServices -= 1;
    this.pricesServices.removeAt(i);
  }

  formLoad(s?: ServiceBudgetDto) {
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
      // s?.id,
      // s?.client,
      // s?.clientId,
      // s?.benchStartedIn,
      // s?.clientProblems,
      // s?.status,
      // s?.visually,
      // s?.finished,
    })
    // this.seeding(s?.solutionsPrices);
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
    loaded?.forEach((s?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(s));
    })
  }

  get dataSource() {
    return this._ServiceBudgetListServices.dataSource;
  }

  grabEntityToTab(entity: any) {
    this.entityToTab = entity;
  }

  tabContentIndex($event) {
    this.indexTabContentField = $event;
  }


  ngOnInit(): void {
    this.formLoad();
    this._ServiceBudgetListServices.firstToLoad(this._ServiceBudgetListServices);
    this.dataSource.subscribe((serviceBudgetDto: ServiceBudgetDto[]) => {
      // this.entities = serviceBudgetDto;

      // this.titleToExpansion = serviceBudgetDto.map(nameClients => nameClients.client.name)
      //  this.descriptionToExpansion = serviceBudgetDto.map(budgetDateStartedIn => budgetDateStartedIn.budgetStartedIn)

    }
    )
  }

}
