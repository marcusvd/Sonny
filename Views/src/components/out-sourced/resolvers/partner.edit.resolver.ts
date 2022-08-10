import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { PartnerListService } from "src/components/partner/services/partner-list.service"
@Injectable()
export class PartnerEditResolver implements Resolve<PartnerDto> {

  constructor(
    private _LoadPartner: PartnerListService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this._LoadPartner.loadById$<PartnerDto>(id)
  }
}
