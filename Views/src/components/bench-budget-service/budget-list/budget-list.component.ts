import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BudgetServiceDto } from 'src/components/bench-budget-service/dto/budget-service-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { BudgetServiceGridListDto } from '../dto/budget-service-grid-list-dto';
import { StatusService } from '../dto/interfaces/i-status-service';
import { BudgetListService } from './services/budget-list.service';


@Component({
  selector: 'budget-list-budget-bench',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit, AfterViewInit {

  headers: string[] = ['', 'Execução', 'Aberto', 'Cliente', 'Defeitos', 'Visual', 'Acessos'];

  @Input() fieldsInEnglish: string[] = ['executionMode', 'entryDate', 'name', 'problemAccordingCustomer', 'isPresentVisuallyDescription', 'dataDescription'];

  companyId = JSON.parse(localStorage.getItem('companyId'));
  btnNewTitle: string = `/side-nav/bench-budget-service-dash/open-budget/${this.companyId}`

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);


  entities: BudgetServiceGridListDto[];
  entities$: Observable<BudgetServiceGridListDto[]>;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _datePipe: PtBrDatePipe,
    private _budgetListService: BudgetListService
  ) { }

  lengthBs: number = 0;
  pageSize: number = 5;

  executionMode(mode: number):string {

    switch (mode) {
      case 0 : {
        return 'Remoto'
        break;
      }
      case 1 : {
        return 'Presencial'
        break;
      }
      case 2 : {
        return 'Remoto / Presencial'
        break;
      }
    }

    return null;

  }

  ngOnInit(): void {


    this.gridListOptsGHelper.getAllEntitiesPaged('BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(1, this.pageSize))

    let viewDto: BudgetServiceGridListDto;

    this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {
      this.entities = [];

      const status: StatusService = new StatusService();

      x.forEach((xy: BudgetServiceDto) => {

        viewDto = new BudgetServiceGridListDto();
        viewDto.id = xy.id;
        viewDto.name = xy.customer.name
        viewDto.dataDescription = xy.dataDescription;
        viewDto.entryDate = this._datePipe.transform(xy.entryDate, 'Date');
        viewDto.isPresentVisuallyDescription = xy.isPresentVisuallyDescription;
        viewDto.executionMode = this.executionMode(xy.executionMode);
        viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
        this.entities.push(viewDto);
      })
      this.entities$ = of(this.entities)
    })



    this._budgetListService.loadById$<number>('budgetsservices/LengthBudgetAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe({
        next: x => {

          this.lengthBs = x;

        }
      })
    //this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('budgetServiceLength')

    //this.lengthBs = this.gridListOptsGHelper.length;
    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

  @ViewChild('pgBs') budgetServicePagination: MatPaginator
  ngAfterViewInit() {

    this.budgetServicePagination.page
      .pipe(
        tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(this.budgetServicePagination.pageIndex + 1, this.budgetServicePagination.pageSize)))
      ).subscribe();
  }

  queryFieldOutput($event: FormControl) {


    const term = $event;

    this.entities$ = of(this.entities.filter((xy: BudgetServiceGridListDto) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.problemAccordingCustomer.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.isPresentVisuallyDescription.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())

    ))

    // const term = $event;

    // this.gridListOptsGHelper.searchQueryHendler(term, 'BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(1, this.pageSize));

    // let viewDto: BudgetServiceGridListDto;
    // this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {

    //   this.entities = [];

    //   x.forEach((xy: BudgetServiceDto) => {
    //     viewDto = new BudgetServiceGridListDto();
    //     viewDto.name = xy.customer.name
    //     viewDto.dataDescription = xy.dataDescription;
    //     viewDto.entryDate = this.datePipe.transform(xy.entryDate, 'Date');
    //     viewDto.isPresentVisuallyDescription = xy.isPresentVisuallyDescription
    //     viewDto.isRemote = xy.isRemote ? 'Sim' : 'Não';
    //     viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
    //     this.entities.push(viewDto);
    //   })
    //   console.log(this.entities)
    //   this.entities$ = of(this.entities)
    // })

  }

  getEntityEvent(entity: any) {
    const companyId = JSON.parse(localStorage.getItem('companyId'));
    const entityId: number = entity.id;
    this._router.navigateByUrl(`side-nav/bench-budget-service-dash/open-service/${entityId}`);
  }



}
