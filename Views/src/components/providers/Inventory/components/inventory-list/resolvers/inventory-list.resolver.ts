import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map, take } from "rxjs/operators";
// import { PartnerDto } from "../../../out-sourced/dto/partner-dto";
// import { PartnerListService } from "../../../out-sourced/services/partner-list.service";
import { InventoryDto } from "../../../dto/inventory-dto";
import { InventoryListService } from "../../../services/inventory-list.service";
// import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";
// import { InventoryCreateService } from "../services/inventory-create.service";
// import { InventoryEquipamentListService } from "../services/inventory-equipament-list.service";

@Injectable()
export class InventoryListResolver implements Resolve<Observable<HttpResponse<InventoryDto[]>>>{
  constructor(
    private _InventoryListServices: InventoryListService
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<HttpResponse<InventoryDto[]>> {

    const pgIndex = route.params['pgIndex'];
    const pgSize = route.params['pgSize'];


    return this._InventoryListServices.loadAllPagedC$(pgIndex,pgSize, null);
  }
}
