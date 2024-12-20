import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable()
export class CustomersGetService extends BackEndService<CustomerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<CustomerDto[]> {
    return this.loadById$<CustomerDto[]>(urlBackEndApi, id);
  }

  getById(id: string, urlBackEndApi:string): Observable<CustomerDto[]> {
    return this.loadById$<CustomerDto[]>(urlBackEndApi, id);
  }


}
