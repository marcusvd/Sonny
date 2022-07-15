import {  Component, OnInit, ViewChild } from '@angular/core';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { InventoryListService } from '../services/inventory-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { PagedResult } from 'src/app/_shared/dtos/pagination';
import {debounceTime } from 'rxjs/operators';

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
  // public terms: string;


  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']

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
    this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
      .subscribe((i: PagedResult<InventoryDto[]>) => {
        this.data.data = i.result;
      })
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

  toLoad() {
    this.spinnerOn();
    setTimeout(() => {
      this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
        .subscribe((i: PagedResult<InventoryDto[]>) => {

          this.dataSource(i.result);
          this.paginator.pageSize = i.pagination.pgSize;
          this.paginator.length = i.pagination.totalItems;

        }).add(this.spinnerOff()),
        () => {

        },
        () => {

          //   console.log(complete)
        }
    }, 2000);


  }

  toSearch(pageIndex?: number, length?: number, pageSize?: number, term?: string, b?: boolean) {

    if (this._InventoryListService._delayInSearch.observers.length === 0) {

      this._InventoryListService._delayInSearch.pipe(debounceTime(1500)).subscribe(
        term => {

          this._InventoryListService.loadAllPagedC$(pageIndex + 1, pageSize, term)

          .subscribe((i: PagedResult<InventoryDto[]>) => {

              this._InventoryListService._loading$.next(b)

              this.dataSource(i.result);

              this._InventoryListService.pageIndex = i.pagination.currentPg;
              this._InventoryListService.pageSize = i.pagination.pgSize;
              this._InventoryListService.length = i.pagination.totalItems;

            }).add(this._InventoryListService._loading$.next(false))
        }
      )
    }
    this._InventoryListService._delayInSearch.next(term)
  }

  ngOnInit(): void {
    this.toLoad();
  }



}
