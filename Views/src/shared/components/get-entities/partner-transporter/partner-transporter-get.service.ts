import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";



@Injectable()
export class PartnerTransporterGetService extends BackEndService<PartnerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment.backEndDoor,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<PartnerDto[]> {
    return this.loadById$<PartnerDto[]>(urlBackEndApi,id);
  }


}
