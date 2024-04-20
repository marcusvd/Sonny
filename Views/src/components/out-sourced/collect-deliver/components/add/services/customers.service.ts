import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";



@Injectable()
export class CustomersService extends BackEndService<CustomerDto> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment.backEndDoor,
    );

  }

  getAll(id: string): Observable<CustomerDto[]> {

    return this.loadById$<CustomerDto[]>('customers/GetAllByIdCompanyAsync',id);

  }

}
