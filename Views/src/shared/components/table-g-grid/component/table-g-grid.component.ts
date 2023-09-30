import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { TableDataSource } from './table-data-source-grid';
import { TableGGridService } from '../services/table-g-grid.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckbox } from '@angular/material/checkbox';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MatRadioButton } from '@angular/material/radio';

@Component({
  selector: 'table-g-grid',
  templateUrl: './table-data-source-grid.html',
  styles: [`
mat-table{
  overflow: auto;
}
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
export class TableGGridComponent implements OnInit {

  @Input() dataSource: TableDataSource;

  @Input() columnsFields: string[] = [];
  @Input() columnsNamesToDisplay: string[] = [];
  @Input() pageSizeOptions: number[] = [];
  @Input() pageSize: number;
  @Input() length: number;
  @Input() tableHtml: string;
  @Output() radioChoice = new EventEmitter<any>();

  selection = new SelectionModel<any>(true, []);

  expandedElement: string;

  constructor(
    private _tableGGridService: TableGGridService,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  results: Observable<any>;
  queryField = new FormControl()

  startSorted() {
    this.sortData({ active: 'id', direction: 'asc' }, this.dataSource)
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

  @ViewChild('radio') radioViewClean: MatRadioButton;
  selectedStart: number;
  onChangeRadioChoice(event: any) {
    this.selectedStart = event.id;
    this.radioChoice.next(event);
    // console.log(event)
  }

  @Input() set radioCleanChoice(clean: boolean) {
       //this.radioViewClean.checked = false;
  }

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

  ngOnInit(): void {

    this.startSorted();

  }

}
