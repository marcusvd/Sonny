import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map, take } from "rxjs/operators";
// import { PartnerDto } from "../../../out-sourced/dto/partner-dto";
// import { PartnerListService } from "../../../out-sourced/services/partner-list.service";
import { StockDto } from "../../../dto/stock-dto";
import {StockListService } from "../../../services/stock-list.service";
// import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";
// import { InventoryCreateService } from "../services/inventory-create.service";
// import { InventoryEquipamentListService } from "../services/inventory-equipament-list.service";

@Injectable()
export class StockListResolver implements Resolve<Observable<HttpResponse<StockDto[]>>>{
  constructor(
    private _stockListServices: StockListService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HttpResponse<StockDto[]>> {

    const pgIndex = route.params['pgIndex'];
    const pgSize = route.params['pgSize'];

return null;
    // return this._InventoryListServices.loadAllPagedC$(pgIndex,pgSize, null);
  }
}
