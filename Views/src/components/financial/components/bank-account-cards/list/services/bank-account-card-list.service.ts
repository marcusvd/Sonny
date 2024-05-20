import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from "../../dto/bank-account-dto";




@Injectable()
export class BankAccountCardListService extends BackEndService<BankAccountDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http,
      environment._FNBANKSACCOUNTS,
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

  companyId: string = JSON.parse(localStorage.getItem('companyId'))
  getAllByCompanyId(){
    return this.loadById$<BankAccountDto>('GetAllFnBankAccount', this.companyId);
  }







}
