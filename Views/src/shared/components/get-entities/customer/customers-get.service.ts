import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";



import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";



@Injectable()
export class CustomersGetService extends BackEndService<CustomerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment.backEndDoor,
    );

  }

  getAll(id: string, urlBackEndApi:string): Observable<CustomerDto[]> {
    return this.loadById$<CustomerDto[]>(urlBackEndApi, id);
  }

  getById(id: string, urlBackEndApi:string): Observable<CustomerDto[]> {
    return this.loadById$<CustomerDto[]>(urlBackEndApi, id);
  }


}
