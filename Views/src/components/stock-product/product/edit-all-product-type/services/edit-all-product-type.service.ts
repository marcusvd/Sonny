import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ProductDto } from "../../dtos/product-dto";



@Injectable({ providedIn: 'root' })
export class EditAllProductTypeService extends BackEndService<ProductDto> {

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
        //  this._route.navigateByUrl(`/stock-product-router/add-item-product`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }

  //   isTested(productItem: FormGroup) {
  //     productItem.value.isTested == true ? productItem.patchValue({ isTested: new Date() }) : productItem.patchValue({ isTested: new Date('0001-01-01T00:00:00') })
  //     return productItem;
  //   }

  //   AddItemToStock(prod: FormGroup, productItem: FormGroup) {

  //     const toSave: StockDto = new StockDto();
  //     toSave.itemsProducts = [];
  //     toSave.itemsProducts[0] = { ... this.isTested(productItem).value }

  //     const product: ProductDto = { ...prod.value }
  //     toSave.product = product;

  //     toSave.id = 0;
  //     toSave.companyId = toSave.itemsProducts[0].companyId;
  //     toSave.userId = toSave.itemsProducts[0].userId;

  //     console.log(toSave)

  //     if (toSave.product.id == 0)
  //       this.addNew(toSave);
  //     else
  //       this.urlUpdatePartial(toSave)


  //   }

  //   addNew(toSave: StockDto) {
  //     this.add$<StockDto>(toSave, 'AddStock').subscribe({
  //       next: () => {
  //         this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //         // this._route.navigateByUrl(`/financial/list-credit-card-invoices`)
  //       },
  //       error: (erroCode) => {
  //         console.log(erroCode)
  //         this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //       }
  //     })
  //   }

  //   urlUpdatePartial(toSave: StockDto) {

  //     console.log(toSave)
  //     this.update$<StockDto>('UpdatePartialProduct', toSave).subscribe({
  //       next: () => {
  //         this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
  //         this._route.navigateByUrl(`/financial/list-credit-card-invoices`)
  //       },
  //       error: (erroCode) => {
  //         console.log(erroCode)
  //         this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //       }
  //     })
  //   }



}


