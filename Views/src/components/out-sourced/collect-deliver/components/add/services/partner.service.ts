import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";



@Injectable()
export class PartnerService extends BackEndService<PartnerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment.backEndDoor,
    );

  }

  getAllTransporters(id: string): Observable<PartnerDto[]> {
    return this.loadById$<PartnerDto[]>('partners/GetAllTransportersByCompanyIdAsync',id);
  }

  getAllPartners(id: string): Observable<PartnerDto[]> {
    return this.loadById$<PartnerDto[]>('partners/GetAllPartnersByIdCompanyAsync',id);
  }

}
