import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { PaginatorDto } from "src/shared/components/table-g/dtos/paginator-dto";
import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ClientTableDto } from "src/components/customer/dto/client-table-dto";
import { CustomerDto } from "src/components/customer/dto/customer-dto";



@Injectable()
export class GetCustomersService extends BackEndService<CustomerDto, number> {

  constructor(
    protected _Http: HttpClient
  ) {
    super(_Http,
      environment._CUSTOMERS,
    );

  }

  getCliAsyncById(id: number): Observable<CustomerDto> {

    return this.loadById$<CustomerDto>(id);

  }

}
