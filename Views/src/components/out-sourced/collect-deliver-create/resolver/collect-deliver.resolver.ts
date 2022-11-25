import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import { ClientListService } from "src/components/customer/components/client-list/services/client-list.service";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { PartnerListService } from "src/components/partner/services/partner-list.service";
import { UnitService } from "src/components/unit/services/unit.service";
import { CompanyDto } from "src/shared/dtos/company-dto";

@Injectable()
export class CollectDeliverCreateResolver implements Resolve<Observable<{ customers: CustomerDto[], partners: PartnerDto[] }>> {

  constructor(
    private _LoadPartner: PartnerListService,
    private _LoadClient: ClientListService,
    private _LoadCompany: UnitService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ customers: CustomerDto[], partners: PartnerDto[] }> {

    const customers$: Observable<CustomerDto[]> = this._LoadClient.loadAll$();
    const partners$: Observable<PartnerDto[]> = this._LoadPartner.loadAll$();
    const companies$: Observable<CompanyDto[]> = this._LoadCompany.loadAll$();

    const Zip = zip(customers$, partners$, companies$)
      .pipe(map(([customers, partners, companies]) =>
        ({ customers, partners, companies })))
    // console.log(Zip)
    return Zip;
  }
}
