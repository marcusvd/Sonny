import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { PartnerListService } from "src/components/partner/services/partner-list.service";

@Injectable()
export class InventoryCreateResolver implements Resolve<Observable<{ partners: PartnerDto[] }>> {
  constructor(
    private _PartnerListService: PartnerListService,
  ) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ partners: PartnerDto[] }> {

    const part$: Observable<PartnerDto[]> = this._PartnerListService.loadAll$<PartnerDto>();
    const Zip = zip(part$)
      .pipe(map(([partners]) => ({ partners })))

      return Zip;
  }
}
