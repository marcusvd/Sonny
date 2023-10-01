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
export class CustomerPartnerLengthResolver extends BackEndService<any> implements Resolve<Observable<{customersLength:number, partnersLength:number}>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{customersLength:number, partnersLength:number}> {

    const customersLength$: Observable<number> = this.loadById$('customers/lengthCustomersAsync', route.paramMap.get('id'));

    const partnersLength$: Observable<number>  = this.loadById$('partners/lengthPartnersAsync', route.paramMap.get('id'));

    const Zip = zip(customersLength$, partnersLength$)
      .pipe(map(([customersLength, partnersLength]) =>
        ({ customersLength, partnersLength })))

    return Zip;
  }
}
