import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";


import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable()
export class CollectDeliverCreateResolver extends BackEndService<any, number> implements Resolve<Observable<{customers:number, partners:number}>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{customers:number, partners:number}> {

    const customers$: Observable<number> = this.loadById$('customers/lengthCustomersAsync', route.paramMap.get('id'));

    const partners$: Observable<number>  = this.loadById$('partners/lengthPartnersAsync', route.paramMap.get('id'));


    const Zip = zip(customers$, partners$)
      .pipe(map(([customers, partners]) =>
        ({ customers, partners })))

    return Zip;
  }
}
