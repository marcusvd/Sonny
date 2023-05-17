import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';


import { TableDataSource } from './table-data-source';
import { TableFullGService } from '../services/table-full-g.service';
import { debounceTime, delay, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'table-full-g',
  template: `
 <ng-content></ng-content>
  <div *ngIf="dataSource.dataBase.length !=0">
  <div fxLayout="row" fxLayoutAlign="center center">
  <mat-form-field fxFlex class="input-search" >
  <mat-label>Pesquisar</mat-label>
  <input matInput [formControl]="queryField" (input)="onSearch()" type="text" >
</mat-form-field>
</div>
<div fxLayout="row" fxLayoutAlign="center center">
<table mat-table style="width:100%;" (matSortChange)="sortChanged($event)" [dataSource]="dataSource"  class="mat-elevation-z8" [matSortActive]="'id'" matSort matSortDirection="asc" matSortDisableClear>
    <ng-container [matColumnDef]="entity" *ngFor="let entity of columnsFields; let i = index;">
        <th style="font-size:25px; color:black;" mat-header-cell *matHeaderCellDef id="cod" mat-sort-header>{{columnsNamesToDisplay[i]}}</th>
        <td mat-cell *matCellDef="let element" id="cod"> {{element[entity]}} </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="columnsFields"></tr>
    <tr mat-row (click)="onRowClicked(row)" *matRowDef="let row; columns: columnsFields;"></tr>
</table>
</div>

<mat-paginator
fxLayoutAlign="center center"
[length]="length"
[pageSize]="pageSize"
 [pageSizeOptions]="pageSizeOptions"
 aria-label="Select page">
</mat-paginator>
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
export class TableFullGComponent implements OnInit, AfterViewInit {

  dataSource: TableDataSource;

  @Input() columnsFields: string[] = [];
  @Input() columnsNamesToDisplay: string[] = [];
  @Input() url: string;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _tableFullGService: TableFullGService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {
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


  onRowClicked(entity: any) {
    console.log(entity)
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
    )

  }

  ngAfterViewInit(): void {


  }


  //Paginator
  @Input() length: number;

  ngOnInit(): void {
    // this.length = this.route.snapshot.data['loaded'];

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
