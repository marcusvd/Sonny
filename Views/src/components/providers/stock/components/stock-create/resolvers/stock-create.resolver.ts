import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { PartnerListService } from "src/components/partner/services/partner-list.service";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable()
export class StockCreateResolver extends BackEndService<any> implements Resolve<Observable<{ stocksLength:number }>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{stocksLength:number}> {

    const stocksLength$: Observable<number>  = this.loadById$('partners/LengthHardwareVendorPartnersAsync', route.paramMap.get('id'));

    const Zip = zip(stocksLength$)
      .pipe(map(([stocksLength]) =>
        ({ stocksLength})))

    return Zip;
  }
}
