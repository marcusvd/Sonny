import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  public data: MatTableDataSource<InventoryDto> = new MatTableDataSource<InventoryDto>();

  public spinnerShowHide: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public _InventoryListService: InventoryListService,
  ) { }


  dataSource(d?: InventoryDto[]) {
    if (d) {
      this.data.data = d;

      return this.data;
    }
    else {
      this.data.data = this._InventoryListService.inventories;

      return this.data
    }

  }


  pageSizeOptions: number[] = [10, 50, 100];
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pageChange($event) {
    this.paginator = $event;
    this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
      .subscribe((i: PagedResult<InventoryDto[]>) => {
        this.data.data = i.result;

      })
  }


  get paginatorGet() {
    return this._InventoryListService.paginator
  }
  set paginatorGet(p: MatPaginator) {
    this._InventoryListService.paginator = p;
  }



  get termsGetSet() {
    return this._InventoryListService.terms
  }
  set termsGetSet(term: string) {
    this._InventoryListService.terms = term;
  }

  spinnerOn() {
    this._InventoryListService._loading$.subscribe(
      (b: boolean) => {
        this.spinnerShowHide = b;
      })
  }

  spinnerOff() {
    this._InventoryListService._loading$.subscribe(
      (b: boolean) => {
        this.spinnerShowHide = b;
      })
    this._InventoryListService._loading$.next(false);
  }

  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']


  toLoad() {
    this.spinnerOn();
    setTimeout(() => {
      this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
        .subscribe((i: PagedResult<InventoryDto[]>) => {

          this.dataSource(i.result);
          this.paginator.pageSize = i.pagination.pgSize;
          this.paginator.length = i.pagination.totalItems;

        }).add(this.spinnerOff()),
        () => {

        },
        () => {

          //   console.log(this.spinnerShow)
        }
    }, 2000);


  }

  // toSearch() {
  //   this.dataSource()
  //   this._InventoryListService.toSearch();
  //   this.paginator.pageIndex =  this._InventoryListService.pageIndex;
  //   this.paginator.length =  this._InventoryListService.length;
  //   this.paginator.pageSize =  this._InventoryListService.pageSize;

  // }

  toSearch(pageIndex?: number, length?: number, pageSize?: number, term?: string, b?: boolean) {

    if (this._InventoryListService._delayInSearch.observers.length === 0) {


      this._InventoryListService._delayInSearch.pipe(debounceTime(1500)).subscribe(
        term => {

          this._InventoryListService.loadAllPaged$(pageIndex + 1, pageSize, this.termsGetSet)
            .subscribe((i: PagedResult<InventoryDto[]>) => {
              this._InventoryListService._loading$.next(b)

              this.dataSource(i.result);

              this._InventoryListService.pageIndex = i.pagination.currentPg;
              this._InventoryListService.pageSize = i.pagination.pgSize;
              this._InventoryListService.length = i.pagination.totalItems;

              //  pageIndex = i.pagination.currentPg;
              //  length = i.pagination.totalItems;

            }).add(this._InventoryListService._loading$.next(false))
        }
      )
    }
    else {
      this._InventoryListService.loadAllPaged$();
    }

    this._InventoryListService._delayInSearch.next(this._InventoryListService.terms)
  }


  ngOnInit(): void {

    this.toLoad();
  }



}
