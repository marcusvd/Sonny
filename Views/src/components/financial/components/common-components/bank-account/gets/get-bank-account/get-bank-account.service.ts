import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { environment } from "../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../shared/services/back-end/backend.service";
import { BankAccountDto } from "../../../../bank-account-cards/dto/bank-account-dto";



@Injectable()
export class GetBankAccountService extends BackEndService<BankAccountDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
    );

  }

  getAll(id: string, urlBackEndApi: string): Observable<BankAccountDto[]> {
    return this.loadById$<BankAccountDto[]>(urlBackEndApi, id);
  }


}
