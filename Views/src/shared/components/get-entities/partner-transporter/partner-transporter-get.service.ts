import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { PartnerDto } from "../../../../components/main/partner/dtos/partner-dto";
import { environment } from "../../../../environments/environment";
import { BackEndService } from "../../../../shared/services/back-end/backend.service";



@Injectable()
export class PartnerTransporterGetService extends BackEndService<PartnerDto> {

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


}
