import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";



import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ProductDto } from "../../dtos/product-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { Observable } from "rxjs";



@Injectable({ providedIn: 'root' })
export class EditSingleProductTypeService extends BackEndService<ProductTypeDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http,
      environment._STOCK_PRODUCTS,
    );

  }


  add(form: FormGroup) {

    const toSave: ProductDto = { ...form.value }
    const warrantyEnd = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate());
    this.add$<ProductDto>(toSave, 'AddProductAsync').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        form.reset({
          id: 0,
          companyId: this.companyId,
          userId: this.userId,
          entryDate: new Date(),
          warrantyEndLocal: warrantyEnd,
          isTested:new Date('0001-01-01T00:00:00.000Z'),
          isUsed:false,
          quantity:1

        });
        //  this._route.navigateByUrl(`/side-nav/stock-product-router/add-item-product`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }

  getProductTypes$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('_PD_Products/GetproducttypesAsync', id);
  }
}


