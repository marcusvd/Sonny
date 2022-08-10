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

  constructor(
    private _ClientListServices: ClientListService,
  ) {

  }
  //Columns

  get displayedColumnsInventory() {
    return this._ClientListServices.displayedColumnsInventory;
  }

  get displayedColumnsInventoryBr() {
    return this._ClientListServices.displayedColumnsInventoryBr;
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

  // get dtSource() {
  //   return this._ClientListServices.dataSource
  // }

  get data() {
    return this._ClientListServices.data;
  }

  callBackEnd(pageIndex?: number, pageSize?: number, terms?: string, start?: Date, end?: Date) {
    this._ClientListServices.callBackEnd
      (pageIndex + 1, pageSize, terms, start, end);
  }

  ngOnInit(): void {
    this._ClientListServices.firstToLoad(this._ClientListServices);

  }



}
