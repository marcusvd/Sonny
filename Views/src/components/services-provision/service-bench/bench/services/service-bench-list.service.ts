import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";

import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { ServiceBudgetDto } from "src/components/services-provision/service-budget/dto/service-budget-dto";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { BenchTableDto } from "../dto/bench-table-dto";
import { Sort } from "@angular/material/sort";
import { Observable, of } from "rxjs";
import { MultipleDataSource } from "src/shared/helpers/multiple-datasource";
import { ServicesBudgetListService } from "src/components/services-provision/service-budget/services/services-budget-list.service";



@Injectable()

export class ServiceBenchListService extends BackEndService<ServiceBudgetDto, number>{

  private _multipleDataSource: MultipleDataSource;
  public getSetdata = new Observable<any>();

  //pagination
  // private _pagination: PaginatorDto = new PaginatorDto();
  // private _pageSizeOptions: number[] = [10, 50, 100];
  // private _pageIndex: number;
  // private _pageSize: number = 10;
  // private _length: number;

  //spinner and search
  // private _spinnerShowHide = true;
  // private _searchTerms: string;
  // private _displayedColumns: string[] = ['id', 'client', 'entryDateOs', 'clientProblems', 'status']
  // private _displayedColumnsBr: string[] = ['Código', 'Cliente', 'Reparo iniciado', 'Dificuldade visão cliente', 'Situação']
  private _serviceBudgetFromDb: ServiceBudgetDto[] = [];


  constructor(
    protected _Http: HttpClient,
    private _LoadClient: ClientListService,
    private _ServicebudgetServices?: ServicesBudgetListService,
    // private _Fb: FormBuilder,
    // private _Dialog: MatDialog,
    // private _SnackBar: MsgOperation,

  ) {
    super(_Http, null, environment._SERVICES_BUDGET);
  }


  // get displayedColumns(): string[] {
  //   return this._displayedColumns;
  // }
  // get displayedColumnsBr(): string[] {
  //   return this._displayedColumnsBr;
  // }
  get serviceBudgetFromDb(): ServiceBudgetDto[] {
    return this._serviceBudgetFromDb;
  }
  // get spinnerShowHide(): boolean {
  //   return this._spinnerShowHide;
  // }
  get dataSource() {
    return this.getSetdata;
  }


  // sortData(sort: Sort) {
  //   this.sortedData = this.getSetdata.data.slice();
  //   const data = this.sortedData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.getSetdata.data = data.sort((a, b) => {
  //     // this.sortedData = data.sort((a, b) => {

  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case this._displayedColumns[0]:
  //         return compare(a.id, b.id, isAsc);

  //       case this._displayedColumns[1]:
  //         return compare(a.client, b.client, isAsc);

  //       case this._displayedColumns[3]:
  //         return compare(a.clientProblems, b.clientProblems, isAsc);

  //       case this._displayedColumns[4]:
  //         return compare(a.status, b.status, isAsc);


  //       default:
  //         return 0;
  //     };
  //   })

  //   function compare(a: number | string, b: number | string, isAsc: boolean) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }

  // }

  firstToLoad(_ServicebudgetServices?: ServicesBudgetListService) {
    this._multipleDataSource = new MultipleDataSource(null, null, null, _ServicebudgetServices, null);
    this.getSetdata = this._multipleDataSource.servicebudgetServices$();
  }




}
