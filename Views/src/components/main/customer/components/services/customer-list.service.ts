import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
// import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CustomerGridDto } from "src/components/main/customer/dtos/customer-grid-dto";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";




@Injectable()
export class CustomerListService extends BackEndService<CustomerDto> {

  constructor(
    override _http: HttpClient
  ) {
    super(_http,
      environment.backEndDoor,
    );

  }



}
