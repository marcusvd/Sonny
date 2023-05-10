import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable, } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { map, take, finalize } from "rxjs/operators";
import { InventoryDto, } from "src/components/providers/Inventory/dto/inventory-dto";
import { PagedResult, Pagination } from "src/shared/dtos/pagination";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
// import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";

import { Sort } from "@angular/material/sort";
import { PaginatorDto } from "src/shared/components/paginator/paginator-dto";

@Injectable()
export class InventoryListService extends BackEndService<InventoryDto, number>{
  //Columns
  private _displayedColumnsInventory = ['id', 'equipament', 'model', 'saleprice', 'manufactorer'];
  private _displayedColumnsInventoryBr = ['Código', 'Peça', 'Modelo', 'Preço', 'Fabricante'];

  //Data
  // private _dataSource: TableDataSource;
  public getSetdata = new MatTableDataSource<any>();
  private sortedData: any[];
  //pagination
  private _pagination: PaginatorDto = new PaginatorDto();
  private _pageSizeOptions: number[] = [10, 50, 100];
  private _pageIndex: number;
  private _pageSize: number = 10;
  private _length: number;

  //spinner and search
  private _spinnerShowHide = true;
  private _searchTerms: string;

  constructor(
    override _http: HttpClient,
  ) {
    super(_http, environment._INVENTORIES_PAGED);

  }

  //#region Columns
  get displayedColumnsInventory() {
    return this._displayedColumnsInventory;
  }
  get displayedColumnsInventoryBr() {
    return this._displayedColumnsInventoryBr;
  }
  //#endregion

  //#region pagination
  get pageSizeOptions() {
    return this._pageSizeOptions;
  }
  get pageIndex() {
    return this._pageIndex;
  }
  get pageSize() {
    return this._pageSize;
  }
  get length() {
    return this._length;
  }
  get pagination() {
    return this._pagination;
  }
  paging($event:any) {
    const Pagination: PaginatorDto = $event;
    // this.callBackEnd(Pagination.pageIndex + 1, Pagination.pageSize);
  }

  // set setPageSizeOptions(setPageSizeOptionsInput: any) {
  //   if (setPageSizeOptionsInput) {
  //     this._pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  //   }
  // }


  //#endregion

  //#region data
  // get dataSource() {
  //   return this._dataSource;
  // }

  get data() {
    return this.getSetdata;
  }
  get spinnerShowHide() {
    return this._spinnerShowHide;
  }
  set data($event: any) {
    this.getSetdata = $event;
  }
  //#endregion

  //#region spinner and search

  search($event?: any) {
    const evt = $event;
    this.getSetdata.filter = $event.text.toLowerCase();

    // if (evt.text) {
    //   this._searchTerms = evt.text.toLowerCase();
    //   this._data.filter = this._searchTerms;
    // }

  }
  //#endregion

  // callBackEnd(pageIndex?: number, pageSize?: number, terms?: string) {
  //   const bodyReturnToView: InventoryToView[] = [];

  //   this._dataSource.inventoryLoad$(pageIndex, pageSize, terms).pipe(
  //     // catchError((s) => of([])),
  //     finalize(() => { this._spinnerShowHide = false; })
  //   ).subscribe((httpResponse: HttpResponse<InventoryDto[]>) => {
  //     const HttpdataReturn = httpResponse;
  //     HttpdataReturn.body.forEach((element: InventoryDto) => {

  //       // console.log(element)

  //       const InvToView = new InventoryToView();
  //       InvToView.id = element.id;
  //      // InvToView.equipament = element?.equipament?.name;
  //       InvToView.model = element.model;
  //       InvToView.saleprice = element.saleprice;
  //       InvToView.manufactorer = element.manufactorer;
  //       bodyReturnToView.push(InvToView)

  //     }),
  //     (error)=>{
  //       this._spinnerShowHide =true;
  //     }
  //     this._pagination = { ...JSON.parse(HttpdataReturn.headers.get('pagination')) }
  //     this.getSetdata.data = bodyReturnToView;
  //     this._pageIndex = this._pagination.pageIndex;
  //     this._pageSize = this._pagination.pageSize;
  //     this._length = this._pagination.length;
  //   })

  // }

  sortData(sort: Sort) {
    this.sortedData = this.getSetdata.data.slice();
    console.log(this.getSetdata)
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.getSetdata.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'equipament':
          return compare(a.equipament, b.equipament, isAsc);
        case 'model':
          return compare(a.model, b.model, isAsc);
        case 'saleprice':
          return compare(a.saleprice, b.saleprice, isAsc);
        case 'manufactorer':
          return compare(a.manufactorer, b.manufactorer, isAsc);
        default:
          return 0;

      };
    })

    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

  }

  firstToLoad(inventoryListService?: InventoryListService) {
    // this._dataSource = new TableDataSource(inventoryListService);
    // this.callBackEnd()
  }

}

