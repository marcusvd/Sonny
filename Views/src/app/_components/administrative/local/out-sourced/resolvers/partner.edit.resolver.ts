import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { PartnerDto } from "src/app/_components/administrative/local/out-sourced/dto/partner-dto";
import { PartnerCrudService } from "src/app/_components/administrative/local/out-sourced/services/partner-crud.service"
@Injectable()
export class PartnerEditResolver implements Resolve<PartnerDto> {

  constructor(
    private _LoadPartner: PartnerCrudService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let id = route.params['id'];
    return this._LoadPartner.loadById$<PartnerDto>(id)
  }
}
