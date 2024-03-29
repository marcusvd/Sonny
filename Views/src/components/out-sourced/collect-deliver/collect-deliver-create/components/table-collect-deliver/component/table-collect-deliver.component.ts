import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';


import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { TableCollectDeliverDataSource } from './table-collect-deliver-data-source';
import { TableCollectDeliverService } from '../services/table-collect-deliver.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'table-collect-deliver',
  templateUrl: 'table-collect-deliver.component.html',
  //   styles: [`

  // tr:hover  {
  //   background-color:green;
  //   cursor:pointer;
  // }
  // th:hover  {
  //   background-color:green;
  //   color:white;
  // }
  // td:hover{
  //   color:white;
  // }
  // .input-search{

  // }
  //   `]
  styles: [`


.mat-row .mat-cell {
  /* border-bottom: 1px solid transparent;
  border-top: 1px solid transparent; */
  cursor: pointer;
}

.mat-row:hover .mat-cell {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-weight: bolder;
  /* border-color: black; */
}
tr:hover  {
  /* background-color:green; */
  cursor:pointer;
}
th:hover  {

  /* background-color:green; */
  /* color:white; */
  /* font-weight: bolder; */
}
td:hover{
  border-right: 1px solid black;

  /* color:white; */
  /* font-weight: bolder; */
}

  `]
})

export class TableCollectDeliverComponent implements OnInit, AfterViewInit {

  dataSource: TableCollectDeliverDataSource;

  // @Input() formMain: FormGroup;
  @Input() columnsFields: string[] = [];
  @Input() columnsNamesToDisplay: string[] = [];
  @Input() url: string;
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;
  @Input() tableHtml: string;
  @Input() length: number;

  @Input() set clearCheckboxes(check: boolean) {
    if (check) {
      this.collectChecks?.forEach(x => {
        x.checked = false;
        x.disabled =false;
      })
      this.deliverChecks?.forEach(y => {
        y.checked = false;
        y.disabled =false;
      })
    }
  }

  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild('collect') checkCollect: MatPaginator;

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
    params = params.append('predicate', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', this.queryField.value ?? '');
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
        this.callBackEnd('customers/GetAllCustomersPagedAsync');
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
        this.callBackEnd('customers/GetAllCustomersPagedAsync');
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

  // @Output() nextStep = new EventEmitter<boolean>(false);
  // onRowClickedEmitNextStep(stepper: any) {
  //   if (stepper)
  //     this.nextStep.emit(true);
  // }

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
  @ViewChildren('CollectChecks') collectChecks: QueryList<MatCheckbox>
  @ViewChildren('DeliverChecks') deliverChecks: QueryList<MatCheckbox>
  checkboxesHandle(id: string, checkStatus: MatCheckbox) {
    if (checkStatus.checked) this.checkBoxesToDisable(id);

    if (!checkStatus.checked) this.checkBoxesToEnable(id);
  }

  checkBoxesToDisable(id: string) {

    this.collectChecks.forEach(x => {
      if (x.id !== id) {
        x.disabled = true;
      }
    })

    this.deliverChecks.forEach(xd => {
      if (xd.id !== id + 'd') {
        xd.disabled = true;
      }
    })
  }

  checkBoxesToEnable(id: string) {
    this.deliverChecks.forEach(dcx => {

      this.collectChecks.forEach(ccx => {
        if (ccx.id === id && ccx.checked === false && dcx.id === id + 'd' && dcx.checked === false) {
          this.collectChecks.forEach(ccxy => {
            ccxy.disabled = false;
          })
          if (dcx.id === id + 'd' && dcx.checked === false) {
            this.deliverChecks.forEach(dcxy => {
              dcxy.disabled = false;
            })
          }
        }
      })
    })

    this.collectChecks.forEach(ccx => {
      this.deliverChecks.forEach(dcx => {
        if (dcx.id === id + 'd' && dcx.checked === false && ccx.id === id + 'd' && ccx.checked === false) {
          this.deliverChecks.forEach(dcxy => {
            dcxy.disabled = false;
          })
          if (ccx.id === id && ccx.checked === false) {
            this.collectChecks.forEach(ccxy => {
              ccxy.disabled = false;
            })

          }
        }
      })
    })
  }

  @Output() collectEntity = new EventEmitter<any>();
  mtdCollectEntity($event: any, status: boolean) {
    const obj = $event;
    this.collectEntity.emit({ obj, status });

  }

  @Output() deliverEntity = new EventEmitter<any>();
  mtdDeliverEntity($event: any, status: boolean) {
    const obj = $event;
    this.deliverEntity.emit({ obj, status });

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

  selectedStart: number;
  onChangeRadioChoice(event: any) {
    //radio bottun started checked
    this.selectedStart = event.id;

    if (event.hasOwnProperty('assured')) this.selectedEntity.emit({ type: 'customer', entity: event });

    if (event.hasOwnProperty('businessLine')) this.selectedEntity.emit({ type: 'partner', entity: event });

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
