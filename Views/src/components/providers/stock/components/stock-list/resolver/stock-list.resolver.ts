import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, zip } from "rxjs";
import { map } from "rxjs/operators";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

@Injectable()
export class StockListResolver extends BackEndService<any> implements Resolve<Observable<{stocksLength:number}>> {

  constructor(
    override _http:HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{stocksLength:number}> {

    const stocksLength$: Observable<number> = this.loadById$('stocks/lengthStocksAsync', route.paramMap.get('id'));

    const $: Observable<number>  = this.loadById$('partners/lengthPartnersAsync', route.paramMap.get('id'));

    const Zip = zip(stocksLength$, $)
      .pipe(map(([stocksLength, ]) =>
        ({ stocksLength,  })))

    return Zip;
  }
}
