import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



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

  @Output() pageEvent  = new EventEmitter();
  @Output() selectedRow = new EventEmitter();
  @Output() pageSort = new EventEmitter();
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


  // setPageSizeOptions(setPageSizeOptionsInput: any) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  pageChange($event:any) {
    const evt = $event;
    this.pageEvent.emit(evt);
  }
  getNameToShowDetailsAtExpanded(name:string){
    this.selectedRow.emit(name);
  }

  sortData($event: Sort) {
    const evt: Sort = $event
    console.log(evt)
    this.pageSort.emit(evt);
  }

  ngOnInit(): void {

  }


}
