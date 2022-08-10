import { HttpResponse } from '@angular/common/http';
import {  Component, OnInit} from '@angular/core';

import { CollectDeliverAllListTableService } from '../services/collect-deliver-all-list-table.service';

import { Sort } from '@angular/material/sort';
import { PaginatorDto } from 'src/shared/components/table-g/dtos/paginator-dto';




@Component({
  selector: 'app-collect-deliver-dash-all',
  templateUrl: './collect-deliver-dash-all.component.html',
  styleUrls: ['./collect-deliver-dash-all.component.css'],

})
export class CollectDeliverListTableAllComponent<T> implements OnInit {
  public searchTerms: string;

  constructor(
    private _CollectDeliverAllListService: CollectDeliverAllListTableService,
  ) {

  }

  //Columns

  get displayedColumnsInventory() {
    return this._CollectDeliverAllListService.displayedColumnsInventory;
  }

  get displayedColumnsInventoryBr() {
    return this._CollectDeliverAllListService.displayedColumnsInventoryBr;
  }
  //pagination
  get pageIndex() {
    return this._CollectDeliverAllListService.pageIndex;
  }
  get pageSize() {
    return this._CollectDeliverAllListService.pageSize;
  }
  get length() {
    return this._CollectDeliverAllListService.length;
  }

  get pageSizeOptions() {
    return this._CollectDeliverAllListService.pageSizeOptions;
  }

  set setPageSizeOptions(setPageSizeOptionsInput: any) {
    this._CollectDeliverAllListService.setPageSizeOptions(setPageSizeOptionsInput);
  }

  get pagination() {
    return this._CollectDeliverAllListService.pagination;
  }

  paging($event) {
    const Pagination: PaginatorDto = $event;
    this._CollectDeliverAllListService.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  }

  //search, spinner, sort
  search($event: any) {
    const evt = $event;
    this.searchTerms = evt?.text?.toLowerCase();

    if (evt?.text?.toLowerCase()) {
      this._CollectDeliverAllListService.getSetdata.filter = this.searchTerms;
    }

    if (evt?.text?.length <= 1 || undefined) {
      this._CollectDeliverAllListService.getSetdata.filter = '';
    }

    if (evt?.start && evt?.end) {
      this.callBackEnd(this.pageIndex, this.pageSize, this?.searchTerms, evt?.start, evt?.end)
    }
    if(this._CollectDeliverAllListService.getSetdata.data.length == -1){
      // this._CollectDeliverAllListService.getSetdata.filter = '';
      this.callBackEnd(this.pageIndex, this.pageSize, this?.searchTerms, evt?.start, evt?.end);
      // this.callBackEnd(this.pageIndex, this.pageSize, this?.searchTerms, evt?.start, evt?.end)
    }



  }

  sort($event: Sort) {
    const evt: Sort = $event;
    this._CollectDeliverAllListService.sortData(evt);
    console.log($event)
  }

  get spinnerShowHide() {
    return this._CollectDeliverAllListService.spinnerShowHide
  }

  get dtSource() {
    return this._CollectDeliverAllListService.dataSource
  }

  get data() {
    return this._CollectDeliverAllListService.data;
  }

  callBackEnd(pageIndex?: number, pageSize?: number, terms?: string, start?: Date, end?: Date) {
    this._CollectDeliverAllListService.callBackEnd
      (pageIndex + 1, pageSize, terms, start, end);
  }

  ngOnInit(): void {
    this._CollectDeliverAllListService.firstToLoad(this._CollectDeliverAllListService);
  }


}
