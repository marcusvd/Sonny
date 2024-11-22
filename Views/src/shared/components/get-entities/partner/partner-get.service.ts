import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";




@Injectable()
export class PartnerGetService extends BackEndService<PartnerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<PartnerDto[]> {
    return this.loadById$<PartnerDto[]>(urlBackEndApi,id);
  }

  getById(id: string, urlBackEndApi:string): Observable<PartnerDto[]> {
    return this.loadById$<PartnerDto[]>(urlBackEndApi,id);
  }

}
