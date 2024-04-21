import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";


import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CommonService } from "src/components/bench-budget-service/commons-components/services/common.service";
import { GridListOptsGHelper } from "src/shared/components/grid-list-opts/helpers/grid-list-opts-helper";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { Observable, of } from "rxjs";
import { BudgetServiceGridListDto } from "src/components/bench-budget-service/dto/budget-service-grid-list-dto";
import { PtBrDatePipe } from "src/shared/pipes/pt-br-date.pipe";

@Component({
  selector: 'hardware-included',
  templateUrl: './hardware-included.component.html',
  styles: [`
  .hardwareTitle{
    font-weight:bolder;
    font-size: 22px;
  }
  .margin-divider-title{
    margin-top:10px;
  }
  `]
})

export class HardwareIncludedComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private datePipe: PtBrDatePipe,
  ) {
    super(_breakpointObserver)
  }

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    // this.entities$ = of(this.entities.filter(
    //   x=> x.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    //   ||
    //   x.model.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    //   ||
    //   x.manufacturer.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    //   ||
    //   x.segment.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())))

  }
  executionMode(mode: number): string {

    switch (mode) {
      case 0: {
        return 'Remoto'
        break;
      }
      case 1: {
        return 'Presencial'
        break;
      }
      case 2: {
        return 'Remoto / Presencial'
        break;
      }
    }

    return null;

  }

  @Output() serviceId = new EventEmitter<number>();
  radioAloneMtd(obj: any) {

    const budgetService: BudgetServiceDto = obj.entity;
    this.serviceId.emit(budgetService.id);

  }

  budgetsServicesBackEndUrl: string = 'BudgetsServices/GetServicesByIdCustomerAsync';
  pageSize: number = 5;
  @Input() customerId: number;
  length: number;
  cssColumns: string[] = ['text-align: center; max-width: 10px;', 'max-width: 45px;', 'max-width: 10px;']
  headers: string[] = ['SELECIONE', 'Implementação ou Defeito', 'Data de início'];
  @Input() fieldsInEnglish: string[] = ['problemAccordingCustomer', 'entryDate'];

  entities: BudgetServiceGridListDto[];
  entities$: Observable<BudgetServiceGridListDto[]>;

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  @Input() callBackEnd: boolean;

  callBackEndMtd() {
    this.gridListOptsGHelper.pageSize = this.pageSize;

    this.gridListOptsGHelper.getAllEntitiesPaged(this.budgetsServicesBackEndUrl, this.gridListOptsGHelper.paramsTo(1, this.pageSize, this.customerId));

    this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {

      let viewDto = new BudgetServiceGridListDto();
      this.entities = [];

      x.forEach((xy: BudgetServiceDto) => {
        this.customerId = xy.customerId
        viewDto = new BudgetServiceGridListDto();
        viewDto.id = xy.id;
        viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
        viewDto.entryDate = this.datePipe.transform(xy.entryDate, 'Date');
        viewDto.executionMode = this.executionMode(xy.executionMode);
        this.entities.push(viewDto);
      })

      this.entities$ = of(this.entities)
    })

  }

  ngOnChanges(changes: SimpleChanges): void {

    this._commonService.loadById$<number>('BudgetsServices/LengthServicesByCustomerIdAsync', this.customerId.toString())
      .subscribe(
        (x: number) => {
          this.length = x;
        }
      )

    this.callBackEndMtd();

  }

  ngOnInit(): void {

    this.callBackEndMtd();

  }

}
