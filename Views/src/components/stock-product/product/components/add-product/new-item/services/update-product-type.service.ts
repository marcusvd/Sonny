import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductTypeDto } from "src/components/stock-product/product/dtos/product-type-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";


@Injectable({ providedIn: 'root' })
export class UpdateProductTypeService extends BackEndService<ProductTypeDto> {

  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
    );

  }
  updateSingle(form: FormGroup) {
    const toSave:ProductTypeDto = { ...form.value }

    this.update$<ProductTypeDto>('_PD_Products/UpdateProductTypeAsync',toSave).subscribe({
      next: () => {
        console.log('deu bom')
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
        this._router.navigate(['/side-nav/stock-product-router/add-product']);
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }
  

}

