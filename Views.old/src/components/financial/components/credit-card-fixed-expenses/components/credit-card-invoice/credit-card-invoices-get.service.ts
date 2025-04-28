import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BankAccountDto } from "src/components/financial/components/bank-account-cards/dto/bank-account-dto";


import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CardDto } from "../../../bank-account-cards/dto/card-dto";



@Injectable()
export class CreditCardInvoicesGetService extends BackEndService<PartnerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<CardDto[]> {
    return this.loadById$<CardDto[]>(urlBackEndApi,id);
  }


}
