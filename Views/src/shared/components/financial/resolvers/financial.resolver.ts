import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { BankAccountDto } from "src/components/financial/components/bank-account-cards/dto/bank-account-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable({providedIn:'root'})
export class FinancialResolver extends BackEndService<BankAccountDto> implements Resolve<Observable<BankAccountDto[]>> {
  constructor(
    override _http: HttpClient

  ) { super(_http, environment.backEndDoor) }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BankAccountDto[]> {

    const iItemsDto$: Observable<BankAccountDto[]> = this.loadById$('fnBanksAccounts/GetAllFnBankAccount', route.paramMap.get('id'));
    return iItemsDto$;
  }
}
