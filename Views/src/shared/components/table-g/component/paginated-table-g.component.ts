import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryToView } from '../dtos/inventory-to-view';
import { TableDataSource } from '../helpers/table-datasource';


@Component({
  selector: 'paginated-table',
  templateUrl: 'paginated-table-g.component.html',
  // styleUrls: ['./table-g.component.css']
})
export class PaginatedTableG implements OnInit {

  @Output() pgEvent: EventEmitter<any> = new EventEmitter();
  @Output() pgSort: EventEmitter<any> = new EventEmitter();
  @Input() displayedColumnsInput: string[] = [];
  @Input() displayedColumnsInputBr: string[] = [];
  @Input() pageSizeOptionsInput: number[] = []
  @Input() dataSourceInput = new MatTableDataSource<any>(null);
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() length: number;
  @Input() matSortActive: string;
  @Input() spinner: boolean;

  constructor() { }

  pageSizeOptions: number[] = this.pageSizeOptionsInput;



  setPageSizeOptions(setPageSizeOptionsInput: any) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {
    const evt = $event;
    this.pgEvent.emit(evt);
  }


  sortData($event: Sort) {
    const evt: Sort = $event
    console.log(evt)
    this.pgSort.emit(evt);
  }

  ngOnInit(): void {

  }


}
