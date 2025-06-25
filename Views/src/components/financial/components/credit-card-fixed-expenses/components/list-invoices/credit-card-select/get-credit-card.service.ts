import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { environment } from "../../../../../../../environments/environment";
import { BackEndService } from "../../../../../../../shared/services/back-end/backend.service";
import { PartnerDto } from "../../../../../../../components/main/partner/dtos/partner-dto";
import { CardDto } from "../../../../bank-account-cards/dto/card-dto";



@Injectable()
export class GetCreditCardService extends BackEndService<PartnerDto> {

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
