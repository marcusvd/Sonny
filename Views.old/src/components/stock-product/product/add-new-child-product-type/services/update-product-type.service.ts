import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { Observable } from "rxjs";


import { ManufacturerDto } from "src/components/stock-product/product/dtos/manufacturer-dto";
import { ModelDto } from "src/components/stock-product/product/dtos/model-dto";
import { ProductTypeDto } from "src/components/stock-product/product/dtos/product-type-dto";
import { SegmentDto } from "src/components/stock-product/product/dtos/segment-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ProductTypeAfterEditHandled } from "../../dtos/product-type-after-edit-handled";


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

  getAllSegments$(id: string): Observable<SegmentDto[]> {
    return this.loadById$<SegmentDto[]>('_PD_ProductChildren/GetSegmentsAsync', id);
  }

  getAllManufacturers$(id: string): Observable<ManufacturerDto[]> {
    return this.loadById$<ManufacturerDto[]>('_PD_ProductChildren/GetManufacturersAsync', id);
  }

  getAllModels$(id: string): Observable<ModelDto[]> {
    return this.loadById$<ModelDto[]>('_PD_ProductChildren/GetModelsAsync', id);
  }

  updateSingle(form: FormGroup) {
    const toSave: ProductTypeDto = { ...form.value }

    this.update$<ProductTypeDto>('_PD_Products/UpdateProductTypeAsync', toSave).subscribe({
      next: (x: ProductTypeDto) => {
       
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
        this.callRouterEditProductType(x as any)
     console.log(x)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }

 private callRouterEditProductType(entity: ProductTypeAfterEditHandled) {

    const objectRoute: NavigationExtras = {
      state: entity
    };
    this._router.navigate(['/side-nav/stock-product-router/add-product'], objectRoute);
  }

}