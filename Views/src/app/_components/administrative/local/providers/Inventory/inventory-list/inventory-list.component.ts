import { AfterViewChecked, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { InventoryListService } from '../services/inventory-list.service';
import { MatPaginator } from '@angular/material/paginator';
import { PagedResult, Pagination } from 'src/app/_shared/dtos/pagination';
import { debounceTime } from 'rxjs/operators';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';


@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  @Output() dataSource: BehaviorSubject<InventoryDto[]> = new BehaviorSubject<InventoryDto[]>(null);
  spinnerShowHide: boolean;
  // pagination: Pagination = new Pagination();
  pgIndex: number;
  totalItems: number;
  pgSize: number;
  // public terms: string;


  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public _InventoryListService: InventoryListService,
    private _ActRoute: ActivatedRoute,
    private _Router: Router
  ) { }


  // dataSourceNext(x?: HttpResponse<InventoryDto[]>) {
  //   if (x) {

  //    this.dataSource.next(x);

  //     return this.dataSource;
  //   }
  //   // else {
  //   //   this.dataSource.next(this._InventoryListService.inventories);

  //   //   return this.dataSource
  //   // }

  // }

  // pageSizeOptions: number[] = [10, 50, 100];
  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   if (setPageSizeOptionsInput) {
  //     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }

  pageChange($event) {
    // this.paginator = $event;
    // this._InventoryListService.loadAllPagedC$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
    //   .subscribe((i: PagedResult<InventoryDto[]>) => {
    //     this.data.data = i.result;
    //   })
  }


  spinner() {
    this.spinnerShowHide = !this.spinnerShowHide;
  }

  toLoad($event?: any) {
    this.pgIndex = $event?.pageIndex;
    this.totalItems = $event?.length;
    this.pgSize = $event?.pageSize;

    this._InventoryListService.loadAllPagedC$<InventoryDto[]>(this.pgIndex + 1, this.pgSize)
    .subscribe({
      next: (cd: HttpResponse<InventoryDto[]>) => {

        const toNext: HttpResponse<InventoryDto[]> = cd;
        const pag: Pagination = JSON.parse(cd.headers.get('pagination'));
        console.log(toNext.body)
        this.dataSource.next(toNext.body);

        this.pgIndex = pag.currentPg;
        this.pgSize = pag.pgSize;
        this.totalItems = pag.totalItems;
      },
      error: (err) => {
        throwError('Error').subscribe({ error: console.error });
      },
      complete: () => {

      }

    })

  }

  ngOnInit(): void {
    this.toLoad();
  }

}
