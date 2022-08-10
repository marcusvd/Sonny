import {Component, OnInit} from '@angular/core';
import { Sort } from '@angular/material/sort';

import { InventoryListService } from '../services/inventory-list.service';
import { PaginatorDto } from 'src/shared/components/table-g/dtos/paginator-dto';
@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  public searchTerms: string;

  constructor(
    private _InventoryListService?: InventoryListService
  ) {

  }

  //Columns
  get displayedColumnsInventory() {
    return this._InventoryListService.displayedColumnsInventory;
  }

  get displayedColumnsInventoryBr() {
    return this._InventoryListService.displayedColumnsInventoryBr;
  }
  //pagination
  get pageIndex() {
    return this._InventoryListService.pageIndex;
  }
  get pageSize() {
    return this._InventoryListService.pageSize;
  }
  get length() {
    return this._InventoryListService.length;
  }

  get pageSizeOptions() {
    return this._InventoryListService.pageSizeOptions;
  }

  set setPageSizeOptions(setPageSizeOptionsInput: any) {
    this._InventoryListService.setPageSizeOptions(setPageSizeOptionsInput);
  }

  get pagination() {
    return this._InventoryListService.pagination;
  }

  paging($event) {
    const Pagination: PaginatorDto = $event;
    this._InventoryListService.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  }

  //search, spinner, sort
  search($event: any) {
    const evt = $event;
    this.searchTerms = evt.text.toLowerCase();
    this._InventoryListService.getSetdata.filter = evt.text.toLowerCase();

    if (evt.text.length <= 1 || undefined) {
      this._InventoryListService.getSetdata.filter = '';
    }

  }

  sort($event: Sort) {
    const evt: Sort = $event;
    this._InventoryListService.sortData(evt);
    console.log($event)
  }

  get spinnerShowHide() {
    return this._InventoryListService.spinnerShowHide
  }

  get dtSource() {
    return this._InventoryListService.dataSource
  }

  get data() {
    return this._InventoryListService.data;
  }

  callBackEnd(pageIndex?: number, pageSize?: number, terms?: string) {
    this._InventoryListService.callBackEnd(pageIndex + 1, pageSize);
  }

  ngOnInit(): void {
    this._InventoryListService.firstToLoad(this._InventoryListService);
  }

}

