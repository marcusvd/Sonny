import { CONTEXT_MENU } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { debounceTime } from "rxjs/operators";
import { map, take } from "rxjs/operators";
import { InventoryDto, } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { PagedResult, Pagination } from "src/app/_shared/dtos/pagination";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class InventoryListService extends BackEndService<InventoryDto, number>{
  public _loading$ = new BehaviorSubject<boolean>(true);
  pageIndex: number;
  pageSize: number;
  length: number;




  @ViewChild(MatPaginator) paginator: MatPaginator;

  private _data: MatTableDataSource<InventoryDto> = new MatTableDataSource<InventoryDto>();
  public _delayInSearch: Subject<string> = new Subject<string>();


  private _inventories: InventoryDto[] = [];
  inv: InventoryDto[] = [];
  constructor(
    protected _Http: HttpClient,
  ) {
    super(_Http, '', environment._INVENTORIES, environment._INVENTORIES_PAGED);
  }





  // loadAllPagedC$<T>(pgNumber?: number, pgSize?: number, term?: string) {
  //   //  const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
  //     let PARAMS = new HttpParams();
  //     if (pgNumber && pgSize) {
  //       PARAMS = PARAMS.append('pgnumber', pgNumber);
  //       PARAMS = PARAMS.append('pgsize', pgSize);
  //     }
  //     if (term) {
  //       PARAMS = PARAMS.append('term', term);
  //     }
  //     return this._Http.get<InventoryDto>(environment._INVENTORIES_PAGED, { observe: 'response', params: PARAMS }).pipe(take(1));
  //   }





  // loadAllPagedC$<InventoryDto>(pgNumber?: number, pgSize?: number, term?: string) {
  // //  const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
  //   let PARAMS = new HttpParams();
  //   if (pgNumber && pgSize) {
  //     PARAMS = PARAMS.append('pgnumber', pgNumber);
  //     PARAMS = PARAMS.append('pgsize', pgSize);
  //   }
  //   if (term) {
  //     PARAMS = PARAMS.append('term', term);
  //   }
  //   return this._Http.get<InventoryDto>(environment._INVENTORIES_PAGED, { observe: 'response', params: PARAMS }).pipe(take(1)).subscribe(

  //     ((response:HttpResponse<any>) => {
  //       pagedResult.result = response

  //       if (response.headers.has('pagination')) {
  //         pagedResult.pagination = JSON.parse(response.headers.get('pagination'))

  //       }
  //       return pagedResult;
  //     })
  //   )
  // }

  get inventories() {
    return this._inventories
  }



}

