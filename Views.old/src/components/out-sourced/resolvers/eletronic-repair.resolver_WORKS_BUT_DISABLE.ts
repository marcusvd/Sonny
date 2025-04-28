import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { CustomerListService } from "src/components/main/customer/components/list/services/customer-list.service";

import { PartnerDto } from "src/components/main/partner/dtos/partner-dto";
import { PartnerListService } from "src/components/main/partner/list/services/partner-list.service";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";


@Injectable()
export class EletronicRepairCreateResolver implements Resolve<Observable<{ customers: CustomerDto[], partners: PartnerDto[]}>> {

  constructor(
    private _loadPartner: PartnerListService,
    private _loadCustomers: CustomerListService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ customers: CustomerDto[], partners: PartnerDto[]}> {

    const customers$: Observable<CustomerDto[]> = this._loadCustomers.loadAll$('GetAllCustomersAsync');
    const partners$: Observable<PartnerDto[]> = this._loadPartner.loadAll$('GetAllPartnersAsync');

    const Zip = zip(customers$, partners$)
      .pipe(map(([customers, partners]) =>
        ({ customers, partners })))

    return Zip;
  }
}
