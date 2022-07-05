import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PartnerDto } from "../../../out-sourced/dto/partner-dto";
import { EquipamentDto } from "../inventory-items/dto/equipament-dto";

@Injectable()
class TeamResolver implements Resolve<Observable<{ equipaments: EquipamentDto, partners: PartnerDto }>> {
  constructor(

    ) { }
  resolve(
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return null
  }
}
