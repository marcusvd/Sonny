import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BenchTableDto } from 'src/components/services-provision/service-bench/bench/dto/bench-table-dto';



@Component({
  selector: 'paginated-table',
  templateUrl: 'paginated-table-g.component.html',
  styleUrls: ['./paginated-table-g.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class PaginatedTableGComponent implements OnInit {

  @Output() pgEvent: EventEmitter<any> = new EventEmitter();
  @Output() pgSort: EventEmitter<any> = new EventEmitter();
  @Input() displayedColumnsInput: string[] = [];
  @Input() displayedColumnsInputBr: string[] = [];
  @Input() pageSizeOptionsInput: number[] = [];
  @Input() dataSourceInput = new MatTableDataSource<any>(null);
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() length: number;
  @Input() matSortActive: string;
  @Input() spinner: boolean;
  @Input() paginationOnOff: boolean;
  @Input() expandedShow: boolean;

  expandedData: any | null;

  constructor() { }

  pageSizeOptions: number[] = this.pageSizeOptionsInput;

  onToggle(sb: BenchTableDto) {
    if (sb == this.expandedData) {
      this.expandedData = null;
    }
    else {
      this.expandedData = sb;
    }
    console.log(this.expandedData)
  }

  setPageSizeOptions(setPageSizeOptionsInput: any) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {
    const evt = $event;
    this.pgEvent.emit(evt);
  }
  test(){
    alert('TEST-TEST-TEST-TEST')
  }

  sortData($event: Sort) {
    const evt: Sort = $event
    console.log(evt)
    this.pgSort.emit(evt);
  }

  ngOnInit(): void {

  }


}
