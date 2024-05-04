import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ProductDto } from "../../dtos/product-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";
import { QuantityDto } from "../../dtos/quantity-dto";



@Injectable()
export class ProductListService extends BackEndService<ProductDto>{

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor);
  }

  save(form: FormGroup) {

    const toSave: ProductDto = { ...form.value };
    this.add$<ProductDto>(toSave, 'products/AddProductAsync').subscribe({
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


}
