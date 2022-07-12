import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { environment } from 'src/environments/environment';
import { InventoryCreateService } from '../services/inventory-create.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { InventoryListService } from '../services/inventory-list.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagedResult, Pagination } from 'src/app/_shared/dtos/pagination';
import { tap, switchMap, debounce, debounceTime } from 'rxjs/operators';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {
  pageIndex:number;
  pageSize:number;
  length:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(
    private _InventoryListService: InventoryListService,
  ) { }

  get inventories() {
    return this._InventoryListService.inventories
  }
  // get length() {
  //   return this._InventoryListService.inventories
  // }
  get spinner() {
    return this._InventoryListService.spinnerBool
  }
  set spinner(b: boolean) {
    this._InventoryListService.spinnerBool = b
  }
  pageSizeOptions: number[] = [5, 10, 25, 100];
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  // get paginatorGet() {
  //   console.log(this._InventoryListService.paginatorGet)
  //   return this._InventoryListService.paginatorGet
  // }

  pageChange($event) {
    this.paginator = $event;
    this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex +1, this.paginator?.pageSize)
      .subscribe((i: PagedResult<InventoryDto[]>) => {
        this.datasource(i.result)

      })
  }

  get termsGetSet() {
    return this._InventoryListService.terms
  }
  set termsGetSet(term: string) {
    this._InventoryListService.terms = term;
  }

  datasource(i?: InventoryDto[]) {

   return this._InventoryListService.datasource(i);

  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this._InventoryListService.setPageSizeOptions(setPageSizeOptionsInput);
  //   }
  // }

  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']


  toLoad() {

    this._InventoryListService.loadAllPaged$<InventoryDto[]>(0, 10)
      .subscribe((i: PagedResult<InventoryDto[]>) => {

        this.paginator.length = i.pagination.totalItems;
        this.paginator.pageIndex = i.pagination.currentPg -1;
        this.paginator.pageSize = i.pagination.pgSize;

        this._InventoryListService.datasource(i.result)
      }).add(() => this._InventoryListService.spinnerOff()),
      (error: any) => {
        console.log(error);
        this._InventoryListService.spinnerOff()
      },
      () => {
        console.log('complete');
      };

  }

  toSearch() {
    this._InventoryListService.toSearch();
  }
  ngOnInit(): void {
    this.toLoad();
    this.toSearch();
    // this._InventoryListService.toSearch();
  }



}
