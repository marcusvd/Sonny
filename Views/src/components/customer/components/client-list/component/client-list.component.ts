import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { ClientListService } from '../services/client-list.service';
import { PaginatorDto } from 'src/shared/components/table-g/dtos/paginator-dto';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: [
    ClientListService
  ]
})


export class ClientListComponent implements OnInit {

  public searchTerms: string;
  public nameofRowExpanded: string;

  constructor(
    private _ClientListServices: ClientListService,
  ) {

  }
  //Columns

  get displayedColumns() {
    return this._ClientListServices.displayedColumns;
  }

  get displayedColumnsBr() {
    return this._ClientListServices.displayedColumnsBr;
  }
  //pagination
  get pageIndex() {
    return this._ClientListServices.pageIndex;
  }
  get pageSize() {
    return this._ClientListServices.pageSize;
  }
  get length() {
    return this._ClientListServices.length;
  }

  get pageSizeOptions() {
    return this._ClientListServices.pageSizeOptions;
  }

  set setPageSizeOptions(setPageSizeOptionsInput: any) {
    this._ClientListServices.setPageSizeOptions(setPageSizeOptionsInput);
  }

  get pagination() {
    return this._ClientListServices.pagination;
  }

  paging($event) {
    const Pagination: PaginatorDto = $event;
    this._ClientListServices.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  }

  rowExpandedName($event) {
   this.nameofRowExpanded = $event;

  }

  //search, spinner, sort

  search($event: any) {
    const evt = $event;

    if (evt.text) {
      this.searchTerms = evt.text.toLowerCase();
      this._ClientListServices.getSetdata.filter = evt.text.toLowerCase();
    }

    if (evt.text.length <= 1 || undefined) {
      this._ClientListServices.getSetdata.filter = '';
    }

  }


  sort($event: Sort) {
    const evt: Sort = $event;
    this._ClientListServices.sortData(evt);
    console.log($event)
  }

  get spinnerShowHide() {
    return this._ClientListServices.spinnerShowHide
  }


  get data() {
    return this._ClientListServices.data;
  }

  ngOnInit(): void {
    this._ClientListServices.firstToLoad(this._ClientListServices);

  }



}
