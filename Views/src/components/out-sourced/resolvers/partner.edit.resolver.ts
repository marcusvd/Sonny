import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";

import { PartnerListService } from "src/components/main/partner/list/services/partner-list.service";

@Injectable()
export class PartnerEditResolver  {

  constructor(
    private _LoadPartner: PartnerListService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    // return this._LoadPartner.loadById$<PartnerDto>(id)
  }
}
