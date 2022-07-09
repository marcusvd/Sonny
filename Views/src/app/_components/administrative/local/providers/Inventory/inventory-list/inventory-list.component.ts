import { AfterContentInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { environment } from 'src/environments/environment';
import { InventoryCreateService } from '../services/inventory-create.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { InventoryListService } from '../services/inventory-list.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagedResult, Pagination } from 'src/app/_shared/dtos/pagination';
import { tap } from 'rxjs/operators';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit, AfterContentInit {

  public _inventories: InventoryDto[] = [];
  public fullLoaded: boolean = true;



  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;


  @ViewChild(MatPaginator)
  paginator: MatPaginator;



  constructor(
    // private _InventoryService: InventoryService,
    private _InventoryListService: InventoryListService,
    private _ActivedRoute: ActivatedRoute
  ) { }

  get inventories() {

    return this._InventoryListService.inventories
  }
  // get spinner() {
  //   return this._InventoryListService.spinner
  // }

  datasource() {
    const data = new BehaviorSubject<InventoryDto[]>(this._inventories);


    if (data) {
      this.fullLoaded = false
    }
    return data;
  }

  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']

  change($event) {
    this.length = $event.length;
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    this.load();


    this._InventoryListService.loadAllPaged$($event.pageIndex, $event.pageSize)



      .subscribe((i: PagedResult<InventoryDto[]>) => {
        // console.log(i)
    console.log(this.pageIndex)
    console.log(this.pageSize)
        // console.log(i.pagination.totalPg);
        this._inventories = i.result;


        // this.pagination.currentPg = i.pagination.currentPg;
        // this.pagination.pgSize = i.pagination.pgSize;
        // this.pagination.totalPg = i.pagination.totalPg;
        // this.pagination.totalItems = i.pagination.totalItems;
        // this.pagination.hasNext = i.pagination.hasNext;
        // this.pagination.hasPrevious = i.pagination.hasPrevious;


        this.length = i.pagination.totalItems;
        this.pageIndex = i.pagination.currentPg;
        this.pageSize = this.pageEvent?.pageSize;





        // this.paginator.pageSize = i.pagination.pgSize;
      })

  }
  load() {

    this._InventoryListService.loadAllPaged$(this.pageIndex, this.pageSize)



      .subscribe((i: PagedResult<InventoryDto[]>) => {
        // console.log(i)
    console.log(this.pageIndex)
    console.log(this.pageSize)
        // console.log(i.pagination.totalPg);
        this._inventories = i.result;


        // this.pagination.currentPg = i.pagination.currentPg;
        // this.pagination.pgSize = i.pagination.pgSize;
        // this.pagination.totalPg = i.pagination.totalPg;
        // this.pagination.totalItems = i.pagination.totalItems;
        // this.pagination.hasNext = i.pagination.hasNext;
        // this.pagination.hasPrevious = i.pagination.hasPrevious;


        this.length = i.pagination.totalItems;
        this.pageIndex = i.pagination.currentPg;
        this.pageSize = this.pageEvent?.pageSize;





        // this.paginator.pageSize = i.pagination.pgSize;
      })
  }

  ngAfterContentInit(): void {
    this.paginator?.page.pipe(
      tap(() => this.load())
    ).subscribe();
  }

  ngOnInit(): void {


    this.load();
    //this._InventoryListService.loadAll();
    //   this._InventoryListService.loadAllPaged$(this.paginator.pageIndex, this.paginator.pageSize)
    //     .subscribe((i: PagedResult<InventoryDto[]>) => {
    //       this._inventories = i.result;
    //       this.paginator.pageIndex = i.pagination.totalPg;
    //       this.paginator.pageSize = i.pagination.pgSize;
    //     })
    // }



  }



}
