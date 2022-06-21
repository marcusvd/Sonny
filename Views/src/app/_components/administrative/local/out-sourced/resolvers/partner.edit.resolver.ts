import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { PartnerDto } from "src/app/_components/administrative/local/out-sourced/dto/partner-dto";
import { PartnerSupplierListService } from "src/app/_components/administrative/local/out-sourced/services/partner-supplier-list.service"
@Injectable()
export class PartnerEditResolver implements Resolve<PartnerDto> {

  constructor(
    private _LoadPartner: PartnerSupplierListService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this._LoadPartner.loadById$<PartnerDto>(id)
  }
}
