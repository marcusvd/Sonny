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
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'table-collect-deliver',
  templateUrl: 'table-collect-deliver.component.html',
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
  @Input() tableHtml: string;
  @Input() length: number;


  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('collect') checkCollect: MatPaginator;

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

  callBackEnd(url: string, params: HttpParams = this.paramsTo()) {
    this.dataSource?.loadEntities(url, params);
  }

  callBackEnd$(url: string, params: HttpParams = this.paramsTo()) {
    return this._tableCollectDeliverService.loadAllPaged$<any[]>(url, params);
  }

  @Input() set selectedRadio(selected: string) { this.radioChose(selected); }
  radioChose($event: string) {

    switch ($event) {
      case 'customer':
        this.callBackEnd('customers/GetAllPagedCustomersAsync');
        this.lengthMutable = this.lengthCustomer;
        break;
      case 'partner':
        this.callBackEnd('partners/GetAllPagedPartnersAsync');
        this.lengthMutable = this.lengthPartner;
        break;
      case 'others':
        // this.dataSource?.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        this.lengthMutable = this.lengthPartner;
        break;
    }

  }

  @Input() set afterSaveRenew($event: string) {

    switch ($event) {
      case 'customer':
        this.callBackEnd('customers/GetAllPagedCustomersAsync');
        this.lengthMutable = this.lengthCustomer;
        break;

      case 'partner':
        this.callBackEnd('partners/GetAllPagedPartnersAsync');
        this.lengthMutable = this.lengthPartner;
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


  // onRowClicked(entity: any) {
  //   console.log(entity)
  // }
  checkboxCollect(entity: any) {
    console.log(entity)
     //console.log(this.checkCollect)
     //this.checkCollect.disabled = true;
   }

  checkboxLabel(row?: any): string {
    return (!row)
      ? `${this.isAllSelected() ? 'select' : 'deselect'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.dataBase.forEach(row => this.selection.select(row));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.dataBase.length;
    return numSelected === numRows;
  }

  selectedStart:number;
  onChangeRadioChoice(event:any){
    this.selectedStart = event.id;
    console.log(event)
  }




  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.callBackEnd(this.url, this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)))
      ).subscribe(() => {

      })
  }

  lengthMutable: number;
  ngOnInit(): void {

    this._route.data.subscribe({
      next: (item: any) => {
        this.lengthMutable = item.loaded['customersLength'];
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
