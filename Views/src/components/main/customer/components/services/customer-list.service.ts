import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
// import { TableDataSource } from "src/shared/components/table-g/helpers/table-datasource";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";




@Injectable()
export class CustomerListService extends BackEndService<CustomerDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment.backEndDoor,
    );

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');



    const customer = new CustomerDto();
    customer.id = id;

    this.deleteFake$<CustomerDto>('customers/DeleteFake', customer).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg('4', 11);
          console.log(error)
          return false;
        }

      }
    );


  }








}
