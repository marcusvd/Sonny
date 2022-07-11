import { CONTEXT_MENU } from "@angular/cdk/keycodes";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { map, take } from "rxjs/operators";
import { InventoryDto, } from "src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto";
import { PagedResult } from "src/app/_shared/dtos/pagination";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from "src/environments/environment";
import { SupplierDto } from "../../supplier/dto/supplier-dto";

@Injectable()
export class InventoryListService extends BackEndService<InventoryDto, number>{

  private _inventories: InventoryDto[] = [];
  inv: InventoryDto[] = [];
  // private _fullLoaded: boolean = true;
  constructor(
    protected _Http: HttpClient,
    // private _Fb: FormBuilder,
    // private _ValidationMsg: ValidatorsService,
    // private _SnackBar: MsgOperation,
    // private _Router: Router,
  ) {

    super(_Http, '', environment._INVENTORIES);
  }
  // get spinner() {
  //   return this._fullLoaded
  // }

  loadAllPaged$<InventoryDto>(pgNumber?: number, pgSize?: number, term?: string, field?: string) {

    const pagedResult: PagedResult<InventoryDto> = new PagedResult<InventoryDto>();
    let PARAMS = new HttpParams();
    if (pgNumber && pgSize) {

      PARAMS = PARAMS.append('pgnumber', pgNumber);
      PARAMS = PARAMS.append('pgsize', pgSize);
    }

    if (term) {
      PARAMS = PARAMS.append('term', term);
    }
    if (field) {
      PARAMS = PARAMS.append('field', field);
    }
    //PARAMS = PARAMS.append('term', term)
    //{ observe: 'response', params }
    //new HttpParams().set('pgnumber', pgNumber?.toString()).set('pgsize', pgSize?.toString())
    //{pgNumber, pgSize}

    return this._Http.get<InventoryDto>(environment._INVENTORIES_PAGED, { observe: 'response', params: PARAMS }).pipe(



      take(1),
      map((response) => {
        pagedResult.result = response.body

        if (response.headers.has('pagination')) {
          pagedResult.pagination = JSON.parse(response.headers.get('pagination'))
          console.log(response.body)
        }
        return pagedResult;
      })
    )
  }


  get inventories() {
    return this._inventories
  }

  //Dont utilized yet;
  //loaded(pgNumber?: number, pgSize?: number) {
  //  }
  // loadAll() {
  //   this.loadAllPaged$(1, 37).subscribe(
  //     (p: PagedResult<InventoryDto[]>) => {
  //       this._inventories = p.result;
  //     })





  //   // this.loadAllIncluded$<InventoryDto>().subscribe(
  //   //   (i: InventoryDto[]) => {
  //   //     this._inventories = i;
  //   //   },

  //   //   () => {
  //   //   }
  //   // )

  //   // this.loadAllIncluded$<InventoryDto>().subscribe(
  //   //   (_inventories: InventoryDto[]) => {

  //   //   });

  // }



}
