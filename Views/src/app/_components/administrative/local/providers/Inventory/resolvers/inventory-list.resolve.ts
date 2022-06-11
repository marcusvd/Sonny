import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { InventoryDto } from "../dto/inventory-dto";
import { InventoryCrudService } from "../services/inventory-crud.service";


@Injectable()
export class InventoryListResolve implements Resolve<InventoryDto[]>{
  constructor(private _Crud: InventoryCrudService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InventoryDto[]> {
  //  let inventories:  Observable<InventoryDto[]>;
  //  inventories = this._Crud.loadAll$<InventoryDto>();

    return this._Crud.loadAll$<InventoryDto>();
  }

}
