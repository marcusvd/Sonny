import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BankAccountDto } from "src/components/financial/components/bank-account-cards/dto/bank-account-dto";


import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable()
export class BankAccountGetService extends BackEndService<PartnerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment.backEndDoor,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<BankAccountDto[]> {
    return this.loadById$<BankAccountDto[]>(urlBackEndApi,id);
  }


}
