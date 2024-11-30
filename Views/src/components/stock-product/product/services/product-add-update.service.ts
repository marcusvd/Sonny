import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";



import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ProductDto } from "../dtos/product-dto";
import { StockDto } from "../dtos/stock-dto";



@Injectable({ providedIn: 'root' })
export class ProductAddUpdateService extends BackEndService<ProductDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http,
      environment._STOCK_PRODUCTS,
    );

  }

  urlGetAll = `GetAllProductsByCompanyIdAsync`
  urlAddNew = `AddProductAsync`
  urlUpdtPartial = `UpdatePartialProduct`


  getAll(id: string): Observable<ProductDto[]> {
    return this.loadById$<ProductDto[]>(this.urlGetAll, id);
  }

  // getById(id: string): Observable<ProductDto[]> {
  //   return this.loadById$<ProductDto[]>(this.urlGet, id);
  // }

  save(form: FormGroup, addOrUpdate: boolean) {
    // if (addOrUpdate)
    //   this.addNew(form);
    // console.log('here')
    // else
    // this.urlUpdatePartial(form);
    // console.log('there')
  }

  // addNew(form: FormGroup) {
  //   const toSave: ProductDto = { ...form.value };
  //   console.log(toSave)
  //   this.add$<ProductDto>(toSave, this.urlAddNew).subscribe({
  //     next: () => {
  //       this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //       this._route.navigateByUrl(`/side-nav/financial-dash/list-credit-card-invoices`)
  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })
  // }

  urlUpdatePartial(form: FormGroup) {
    const toSave: ProductDto = { ...form.value };
    console.log(toSave)
    this.update$<ProductDto>(this.urlUpdtPartial, toSave).subscribe({
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

  AddItemToStock(product: FormGroup, productItem: FormGroup) {

    const toSave: StockDto = new StockDto();

    toSave.product = { ...product.value }

    toSave.itemsProducts[0] = { ...productItem.value }


    this.add$<StockDto>(toSave, this.urlAddNew).subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
       // this._route.navigateByUrl(`/side-nav/financial-dash/list-credit-card-invoices`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }


}


  // urlUpdatePartial(form: FormGroup) {
  //   const toSave: ProductDto = { ...form.value };
  //   console.log(toSave)
  //   this.update$<ProductDto>(this.urlUpdtPartial, toSave).subscribe({
  //     next: () => {
  //       this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //       this._route.navigateByUrl(`/side-nav/financial-dash/list-credit-card-invoices`)
  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }
  //   })
  // }
