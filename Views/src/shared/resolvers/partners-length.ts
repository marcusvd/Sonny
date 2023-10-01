import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";


import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable()
export class PartnersLengthResolver extends BackEndService<any> implements Resolve<Observable<{PartnersLength:number}>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{PartnersLength:number}> {

    const PartnersLength$: Observable<number> = this.loadById$('Partners/lengthPartnersAsync', route.paramMap.get('id'));

    const Zip = zip(PartnersLength$)
      .pipe(map(([PartnersLength]) =>
        ({PartnersLength})))

    return Zip;
  }
}

