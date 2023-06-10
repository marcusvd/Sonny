import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { StockListService } from '../../services/stock-list.service';
import { TableDataSourceStock } from '../table-data/table-data-source-grid-stock.component';
import { TableGGridStockService } from '../table-data/table-g-grid-stock.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})

export class StockListComponent implements OnInit {

  dataSource: TableDataSourceStock;

  titleTable: string = 'Estoque';

  constructor(
    private _route: ActivatedRoute,
    private _tableGGridStockService: TableGGridStockService

  ) {

  }

  //Columns
  // get displayedColumnsInventory() {
  //   return this._stockListService.displayedColumnsInventory;
  // }

  // get displayedColumnsInventoryBr() {
  //   return this._stockListService.displayedColumnsInventoryBr;
  // }
  // //pagination
  // get pageIndex() {
  //   return this._stockListService.pageIndex;
  // }
  // get pageSize() {
  //   return this._stockListService.pageSize;
  // }
  // get length() {
  //   return this._stockListService.length;
  // }

  // get pageSizeOptions() {
  //   return this._stockListService.pageSizeOptions;
  // }

  // set setPageSizeOptions(setPageSizeOptionsInput: any) {
  //   // this._stockListService.setPageSizeOptions(setPageSizeOptionsInput);
  // }

  // get pagination() {
  //   return this._stockListService.pagination;
  // }

  // paging($event) {
  //   const Pagination: PaginatorDto = $event;
  //   this._stockListService.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  // }

  //search, spinner, sort
  // search($event: any) {
  //   const evt = $event;
  //   this.searchTerms = evt.text.toLowerCase();
  //   this._stockListService.getSetdata.filter = evt.text.toLowerCase();

  //   if (evt.text.length <= 1 || undefined) {
  //     this._stockListService.getSetdata.filter = '';
  //   }

  // }

  // sort($event: Sort) {
  //   const evt: Sort = $event;
  //   this._stockListService.sortData(evt);
  //   console.log($event)
  // }

  // get spinnerShowHide() {
  //   return this._stockListService.spinnerShowHide
  // }

  // // get dtSource() {
  // //   return this._stockListService.dataSource
  // // }

  // get data() {
  //   return this._stockListService.data;
  // }

  // // callBackEnd(pageIndex?: number, pageSize?: number, terms?: string) {
  // //   this._stockListService.callBackEnd(pageIndex + 1, pageSize);
  // // }
  length: number;
  ngOnInit(): void {
    // this._stockListService.firstToLoad(this._stockListService);
    this.dataSource = new TableDataSourceStock(this._tableGGridStockService);
    //console.log()
    this._route.data.subscribe((x: any) => {
      this.length = x.loaded['stocksLength']
    })

  }

}

