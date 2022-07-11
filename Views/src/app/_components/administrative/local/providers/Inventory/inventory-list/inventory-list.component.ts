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
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  public _inventories: InventoryDto[] = [];
  public fullLoaded: boolean = true;
  selected = new FormControl('manunfacture')



  pageSizeOptions: number[] = [5, 10, 25, 100];

  //pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  public data: MatTableDataSource<InventoryDto> = new MatTableDataSource<InventoryDto>();
  public field: string;
  constructor(

    private _InventoryListService: InventoryListService,
    private _ActivedRoute: ActivatedRoute
  ) { }

  get inventories() {
    return this._InventoryListService.inventories
  }

  datasource(i?: InventoryDto[]) {

    this.data.data = this._inventories;
    if (this.data) {
      this.fullLoaded = false
    }

    return this.data;
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  displayedColumns = ['id', 'equipament', 'quantity', 'model', 'saleprice', 'manufactorer']

  pageChange($event) {
    this.paginator = $event;
    this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex + 1, this.paginator?.pageSize)
      .subscribe((i: PagedResult<InventoryDto[]>) => {
        this.datasource(i.result)
        this._inventories = i.result;
      })
  }



  search(term?: string, field?: string) {
  let trigger ;
    if (field) {
    trigger =  this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex + 1, this.paginator?.pageSize, this.field)
    }


    console.log(term)
    if (term) {
      // this._InventoryListService.loadAllPaged$(this.paginator?.pageIndex + 1, this.paginator?.pageSize, this.field)
       trigger.subscribe((i: PagedResult<InventoryDto[]>) => {
          this.datasource(i.result)
          this._inventories = i.result;
        })
    }

  }


  load() {

    this._InventoryListService.loadAllPaged$(0, 10)
      .subscribe((i: PagedResult<InventoryDto[]>) => {
        this.paginator.length = i.pagination.totalItems;
        this._inventories = i.result;
      })
  }

  ngOnInit(): void {
    this.load();
  }



}
