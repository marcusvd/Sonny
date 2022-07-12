import { CONTEXT_MENU } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams } from "@angular/common/http";
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

@Injectable()
export class InventoryListService extends BackEndService<InventoryDto, number>{

  private _fullLoaded: boolean = true;
  public terms: string;
  public length: number;



  private _data: MatTableDataSource<InventoryDto> = new MatTableDataSource<InventoryDto>();
  private _delayInSearch: Subject<string> = new Subject<string>();


  private _inventories: InventoryDto[] = []; e
  inv: InventoryDto[] = [];
  constructor(
    protected _Http: HttpClient,
  ) {
    super(_Http, '', environment._INVENTORIES);
  }


  set spinnerBool(b: boolean) {
    this._fullLoaded = b;
  }
  get spinnerBool() {
    return this._fullLoaded
  }
  // get paginatorGet() {
  //   return this.paginator
  // }
  get termsGetSet() {
    return this.terms
  }
  set termsGetSet(term: string) {
    this.terms = term;
  }

  toSearch(pageIndex?: number, length?: number, pageSize?: number, term?: string) {
    if (this._delayInSearch.observers.length === 0) {
      this.spinnerBool = true;
      this._delayInSearch.pipe(debounceTime(1500)).subscribe(
        term => {
          this.loadAllPaged$(pageIndex + 1, pageSize, term)
            .subscribe((i: PagedResult<InventoryDto[]>) => {
              // this.paginator.pageIndex = i.pagination.currentPg;
              // this.paginator.pageSize = i.pagination.pgSize;
              this.length = i.pagination.totalItems;
              this.datasource(i.result)
              this._inventories = i.result;
            }).add(this.spinnerOff())
        }
      )
    }
    else {
      this.toSearch(0,10);
    }
    this._delayInSearch.next(this.terms)
  }

  spinnerOff() {
    this.spinnerBool = false;
  }



  datasource(i?: InventoryDto[]) {
    this._data.data = this._inventories;
    return this._data;
  }



  // get spinner() {
  //   return this._fullLoaded
  // }

  loadAllPaged$<InventoryDto>(pgNumber?: number, pgSize?: number, term?: string) {
    const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
    let PARAMS = new HttpParams();
    if (pgNumber && pgSize) {
      PARAMS = PARAMS.append('pgnumber', pgNumber);
      PARAMS = PARAMS.append('pgsize', pgSize);
    }
    if (term) {
      PARAMS = PARAMS.append('term', term);
    }
    return this._Http.get<InventoryDto>(environment._INVENTORIES_PAGED, { observe: 'response', params: PARAMS }).pipe(
      take(1),
      map((response) => {
        pagedResult.result = response.body

        if (response.headers.has('pagination')) {
          pagedResult.pagination = JSON.parse(response.headers.get('pagination'))

        }
        return pagedResult;
      })
    )
  }

  get inventories() {
    return this._inventories
  }



}
