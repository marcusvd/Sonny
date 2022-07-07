import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { PartnerDto } from "../../../out-sourced/dto/partner-dto";
import { PartnerListService } from "../../../out-sourced/services/partner-list.service";
import { EquipamentDto } from "../inventory-equipament/dto/equipament-dto";
import { InventoryCreateService } from "../services/inventory-create.service";
import { InventoryEquipamentListService } from "../services/inventory-equipament-list.service";

@Injectable()
export class InventoryCreateResolver implements Resolve<Observable<{ equipaments: EquipamentDto[], partners: PartnerDto[] }>> {
  constructor(
      private _PartnerListService: PartnerListService,
      private _InventoryEquipamentListServices: InventoryEquipamentListService
    ) { }
  resolve(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): Observable<{ equipaments: EquipamentDto[], partners: PartnerDto[] }> {


    const equip$: Observable<EquipamentDto[]> = this._InventoryEquipamentListServices.loadAll$<EquipamentDto>();
    const part$: Observable<PartnerDto[]> = this._PartnerListService.loadAll$<PartnerDto>();

    const Zip = zip(equip$, part$)
    .pipe(map(([equipaments,partners]) => ({equipaments,partners})))


    return Zip;
  }
}
