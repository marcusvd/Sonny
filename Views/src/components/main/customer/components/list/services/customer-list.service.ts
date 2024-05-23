import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CustomerDto } from "../../commons-components/dtos/customer-dto";




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

    this.deleteFake$<CustomerDto>('customers/DeleteFakeCustomer', customer).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },
        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg(error, 1);
          console.log(error)
          return false;
        }

      }
    );


  }








}
