import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { Form, FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';


import { TableDataSource } from './table-data-source';
import { TableFullGService } from '../services/table-full-g.service';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'table-full-g',
  template: `
<div fxLayout="row" fxLayoutAlign="center center">
 <mat-form-field fxFlex="90" class="input-search" >
 <mat-label>Pesquisar</mat-label>
 <input matInput [formControl]="queryField" (input)="onSearch()" type="text" >
</mat-form-field>
</div>
 <!-- <ng-content select=[spinner]></ng-content> -->
 <!-- <ng-content select=[paginator]></ng-content> -->
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
 <mat-paginator
fxLayoutAlign="center center"
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
export class TableFullGComponent implements OnInit, AfterViewInit, OnChanges {

  dataSource: TableDataSource;

  @Input() columnsFields: string[] = [];
  @Input() columnsNamesToDisplay: string[] = [];
  @Input() url: string;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;
  @Input() onClickSelected = new FormControl();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _tableFullGService: TableFullGService,
    private _route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {

  }




  // urlToChange: string = '';
  // urlToChange: string = 'customers/GetAllPagedCustomersAsync';
  lengthCustomer: number = 0;
  lengthPartner: number = 0;
  // @Output() radioChoseOutput = new EventEmitter<string>();
  @Input() selectedRadio: string = '';
  radioChose($event: string) {

    switch ($event) {
      case 'customer':

        // this.typeEntitySelected = 'customer';
        // this.urlToChange = 'customers/GetAllPagedCustomersAsync';
        this.dataSource?.loadEntities('customers/GetAllPagedCustomersAsync', this.paramsTo());
        this.length = this.lengthCustomer;
        // this.radioChoseOutput.emit($event);
        // console.log($event);
        break;
      case 'partner':
        // this.typeEntitySelected = 'partner';
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        // console.log($event);
        break;
      case 'others':
        // this.typeEntitySelected = 'others';
        // console.log($event);
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        break;
    }

  }


 @Input() set afterSaveRenew($event: string) {

    switch ($event) {
      case 'customer':

        // this.typeEntitySelected = 'customer';
        // this.urlToChange = 'customers/GetAllPagedCustomersAsync';
        this.dataSource?.loadEntities('customers/GetAllPagedCustomersAsync', this.paramsTo());
        this.length = this.lengthCustomer;
        // this.radioChoseOutput.emit($event);
        // console.log($event);
        break;
      case 'partner':
        // this.typeEntitySelected = 'partner';
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        // console.log($event);
        break;
      case 'others':
        // this.typeEntitySelected = 'others';
        // console.log($event);
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        break;
    }

  }

  results: Observable<any>;
  queryField = new FormControl()
  onSearch() {

    let value = this.queryField.value;

    if (value && (value = value.trim() != '')) {
      this.results = this.getPaginatedEntities(this.paramsTo());
    }

  }

  getPaginatedEntities(params: HttpParams) {
    return this._tableFullGService.loadAllPaged$<any[]>(this.url, params);
  }

  private sortedData: any[];
  sortData(sort: Sort, dataTable: TableDataSource) {

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

  get spinner() {
    if (this.dataSource.dataBase.length != 0) {
      return true;
    }
    return false;
  }

  @Output() nextStep = new EventEmitter<boolean>(false);
  onRowClickedEmitNextStep(stepper: any) {
    if (stepper)
      this.nextStep.emit(true);
  }

  //typeEntitySelected: string = 'customer';
  @Output() selectedEntity = new EventEmitter<any>();

  onRowClickedEmitEntity(entity: any) {
    if (entity.customerType !== undefined) {
      this.selectedEntity.emit({ type: 'customer', entity: entity });
    }
    else {
      this.selectedEntity.emit({ type: 'partner', entity: entity });
    }





  }

  paramsTo(pageIndex: number = 1, pageSize: number = 10) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pageSize);
    params = params.append('companyid', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', this.queryField.value);
    return params;
  }

  loadEntitiesPage() {
    this.dataSource.loadEntities(this.url, this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)
      // this.dataSource.loadEntities(this.urlToChange, this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)
    )

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRadio) {
      this.radioChose(this.selectedRadio);
    }

  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadEntitiesPage())
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

    this.dataSource = new TableDataSource(this._tableFullGService);

    this.dataSource.loadEntities(this.url, this.paramsTo());
    this.queryField.valueChanges.pipe(
      map(x => x.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.getPaginatedEntities(this.paramsTo())),
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
