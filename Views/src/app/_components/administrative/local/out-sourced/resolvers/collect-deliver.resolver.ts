import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, Subscription, zip } from "rxjs";
import { map } from "rxjs/operators";

import { PartnerDto } from "src/app/_components/administrative/local/out-sourced/dto/partner-dto";
import { PartnerSupplierListService } from "src/app/_components/administrative/local/out-sourced/services/partner-supplier-list.service"
import { ClientDto } from "../../../client/dto/client-dto";
import { ClientListService } from "../../../client/services/client-list.service";
@Injectable()
export class CollectDeliverResolver implements Resolve<Observable<{ clients: ClientDto[],partners: PartnerDto[]}>> {

  constructor(
    private _LoadPartner: PartnerSupplierListService,
    private _LoadClient: ClientListService,
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{clients: ClientDto[],partners: PartnerDto[]}> {

    const clients$: Observable<ClientDto[]> = this._LoadClient.loadAll$();
    const partners$: Observable<PartnerDto[]> = this._LoadPartner.loadAll$();

    const Zip = zip(clients$, partners$).pipe(map(([clients, partners])=> ({clients, partners})))

    return Zip;
  }
}
