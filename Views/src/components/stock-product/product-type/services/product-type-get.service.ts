import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ProductTypeDto } from "src/components/stock-product/product-type/dtos/product-type-dto";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";



@Injectable()
export class ProductTypeGetService extends BackEndService<ProductTypeDto> {

  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_Http,
      environment._STOCK_PRODUCTS_TYPES,
    );

  }

  urlBackEndApi = `GetAllProductTypesByCompanyIdAsync`
  urlAddBackEndApi = `AddProductTypeAsync`

  getAll(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>(this.urlBackEndApi, id);
  }

  getById(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>(this.urlBackEndApi, id);
  }

  save(form: FormGroup) {

    const toSave: ProductTypeDto = { ...form.value };


    console.log(toSave)
    this.add$<ProductTypeDto>(toSave, this.urlAddBackEndApi).subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        this._route.navigateByUrl(`/side-nav/financial-dash/list-credit-card-invoices`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })





  }






}
