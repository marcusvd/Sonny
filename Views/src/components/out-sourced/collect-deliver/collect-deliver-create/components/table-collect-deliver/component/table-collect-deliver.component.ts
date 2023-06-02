import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { Form, FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';


import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { TableCollectDeliverDataSource } from './table-collect-deliver-data-source';
import { TableCollectDeliverService } from '../services/table-collect-deliver.service';


@Component({
  selector: 'table-collect-deliver',
  template: `
<div fxLayout="row" fxLayoutAlign="center center">
    <mat-form-field fxFlex="90" class="input-search" >
      <mat-label>Pesquisar</mat-label>
      <input matInput [formControl]="queryField" (input)="onSearch()" type="text" >
    </mat-form-field>
</div>
<div class="spinner-container" fxLayout="column" fxLayoutAlign="center center" *ngIf="this.dataSource.dataBase.length == 0">
    <div fxLayout="row">
      <div fxLayoutAlign="center center">
      <mat-spinner spinner></mat-spinner>
    </div>
</div>

 <br>

    <div fxLayout="row">
      <div fxLayoutAlign="center center">
         Nenhum registro encontrado...
      </div>
    </div>
</div>

 <mat-paginator fxLayoutAlign="center center"
    [length]="length"
    [pageSize]="pageSize"
    [pageSizeOptions]="pageSizeOptions"
    aria-label="Select page">
</mat-paginator>

  <div [hidden]="!spinner">
<div fxLayout="row" >
  <table  mat-table style="width:100%;" (matSortChange)="sortChanged($event)"  [dataSource]="dataSource"  class="mat-elevation-z8" [matSortActive]="'id'" matSort matSortDirection="asc" matSortDisableClear>
     <ng-container  [matColumnDef]="entity" *ngFor="let entity of columnsFields; let i = index;">
         <th style="font-size:25px; color:black;" mat-header-cell *matHeaderCellDef id="cod" mat-sort-header>{{columnsNamesToDisplay[i]}}</th>
         <td  mat-cell *matCellDef="let element" id="cod"> {{element[entity]}} </td>
     </ng-container>
     <tr  mat-header-row  *matHeaderRowDef="columnsFields"></tr>
     <tr  mat-row  (click)="onRowClickedEmitNextStep(row)" (click)="onRowClickedEmitEntity(row)" *matRowDef="let row; columns: columnsFields;"></tr>
  </table>
</div>
<br>
<br>


  </div>

  `,
  styles: [`

tr:hover  {
  background-color:green;
  cursor:pointer;
}
th:hover  {
  background-color:green;
  color:white;
}
td:hover{
  color:white;
}
.input-search{

}
  `]
})

export class TableCollectDeliverComponent implements OnInit, AfterViewInit {

  dataSource: TableCollectDeliverDataSource;

  @Input() columnsFields: string[] = [];
  @Input() columnsNamesToDisplay: string[] = [];
  @Input() url: string;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  lengthCustomer: number = 0;
  lengthPartner: number = 0;

  constructor(
    private _tableCollectDeliverService: TableCollectDeliverService,
    private _route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  get spinner() {
    if (this.dataSource.dataBase.length != 0) {
      return true;
    }
    return false;
  }

  paramsTo(pageIndex: number = 1, pageSize: number = 10) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pageSize);
    params = params.append('companyid', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', this.queryField.value);
    return params;
  }

  callBackEnd(url: string, params:HttpParams = this.paramsTo()) {
    this.dataSource?.loadEntities(url, params);
  }

  callBackEnd$(url: string, params:HttpParams = this.paramsTo()) {
   return this._tableCollectDeliverService.loadAllPaged$<any[]>(url, params);
  }

  @Input() set selectedRadio(selected: string) { this.radioChose(selected); }
  radioChose($event: string) {

    switch ($event) {
      case 'customer':
        this.callBackEnd('customers/GetAllPagedCustomersAsync');
        this.length = this.lengthCustomer;
        break;
      case 'partner':
        this.callBackEnd('partners/GetAllPagedPartnersAsync');
        this.length = this.lengthPartner;
        break;
      case 'others':
        // this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.length = this.lengthPartner;
        break;
    }

  }

  @Input() set afterSaveRenew($event: string) {

    switch ($event) {
      case 'customer':
        this.callBackEnd('customers/GetAllPagedCustomersAsync');
        this.length = this.lengthCustomer;
        break;

      case 'partner':
        this.callBackEnd('partners/GetAllPagedPartnersAsync');
        this.length = this.lengthPartner;
        break;

      case 'others':
        break;
    }

  }

  results: Observable<any>;
  queryField = new FormControl()
  onSearch() {

    let value = this.queryField.value;

    if (value && (value = value.trim() != '')) {
      this.results = this._tableCollectDeliverService.loadAllPaged$<any[]>(this.url, this.paramsTo());
    }

  }

  private sortedData: any[];
  sortData(sort: Sort, dataTable: TableCollectDeliverDataSource) {

    const getSetdata = dataTable;
    this.sortedData = getSetdata.dataBase.slice();
    const data = this.sortedData.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    getSetdata.dataBase = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        default:
          return 0;

      };
    })

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  }

  sortChanged(sortState: Sort) {

    this.sortData(sortState, this.dataSource)

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  @Output() nextStep = new EventEmitter<boolean>(false);
  onRowClickedEmitNextStep(stepper: any) {
    if (stepper)
      this.nextStep.emit(true);
  }

  @Output() selectedEntity = new EventEmitter<any>();
  onRowClickedEmitEntity(entity: any) {
    if (entity.customerType !== undefined) {
      this.selectedEntity.emit({ type: 'customer', entity: entity });
    }
    else {
      this.selectedEntity.emit({ type: 'partner', entity: entity });
    }
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.callBackEnd(this.url, this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)))
      ).subscribe(() => {

      })
  }

  length: number;
  ngOnInit(): void {

    this._route.data.subscribe({
      next: (item: any) => {
        this.length = item.loaded['customersLength'];
        this.lengthCustomer = item.loaded['customersLength'];
        this.lengthPartner = item.loaded['partnersLength'];
      }
    });

    this.dataSource = new TableCollectDeliverDataSource(this._tableCollectDeliverService);

    this.dataSource.loadEntities(this.url, this.paramsTo());
    this.queryField.valueChanges.pipe(
      map(x => x.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.callBackEnd$(this.url)),
      tap(value => {
        this.dataSource.dataBase = value.body;

      })
    ).subscribe(
      () => {
        if (this.queryField.value === '') {
          this.dataSource.loadEntities(this.url, this.paramsTo());
        }
      }
    );

  }
}
