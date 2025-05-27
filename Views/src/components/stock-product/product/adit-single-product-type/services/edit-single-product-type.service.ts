import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";



import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ProductTypeAfterEditHandled } from "../../dtos/product-type-after-edit-handled";
import { ProductTypeDto } from "../../dtos/product-type-dto";



@Injectable({ providedIn: 'root' })
export class EditSingleProductTypeService extends BackEndService<ProductTypeDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) {
    super(_http,
      environment._STOCK_PRODUCTS,
    );

  }


  updateSingle(form: FormGroup) {
    const toSave: ProductTypeDto = { ...form.value }

    this.update$<ProductTypeDto>('UpdateProductTypeAsync', toSave).subscribe({
      next: (x: ProductTypeDto) => {

        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
        this.callRouterEditProductType(x as any)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }

  getProductTypes$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('GetproducttypesAsync', id);
  }

  getProductTypeByIdAllIncluded$(id: string): Observable<ProductTypeDto> {
    return this.loadById$<ProductTypeDto>('GetProductTypesByIdIncludedAsync', id);
  }

  
private callRouterEditProductType(entity: ProductTypeAfterEditHandled) {

  const objectRoute: NavigationExtras = {
    state: entity
  };
  this._router.navigate(['/stock-product-router/add-product'], objectRoute);
}

}


