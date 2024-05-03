import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormGroup, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { TableProvidedServicesPricesDto } from "src/components/bench-budget-service/dto/table-provided-services-prices-dto";

@Injectable()
export class TableProvidedServicesPricesService extends BackEndService<TableProvidedServicesPricesDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  save(form: FormGroup) {

    const toSave = <FormArray>form.get('TableProvidedServicesPrices');

    const result: TableProvidedServicesPricesDto[] = [...toSave.value]

    this.addRange$<TableProvidedServicesPricesDto>(result, 'TableProvidedServicesPrices/AddTableProvidedServicesPrices').subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        console.log(errors)
      }
    })
  }





  // save(form: FormGroup) {

  //   const toSave: TableProvidedServicesPricesDto = { ...form.value };
  //   this.add$<TableProvidedServicesPricesDto>(toSave, 'TableProvidedServicesPrices/AddTableProvidedServicesPrices').subscribe({
  //     next: () => {
  //       this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
  //       form.reset();
  //     },
  //     error: (errors) => {
  //       this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
  //       console.log(errors)
  //     }
  //   })
  // }
}
