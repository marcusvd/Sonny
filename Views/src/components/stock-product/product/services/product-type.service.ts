import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { Router } from "@angular/router";
import { FormArray, FormGroup } from "@angular/forms";
import { ProductTypeDto } from "../dtos/product-type-dto";
import { SegmentDto } from "../dtos/segment-dto";
import { ManufacturerDto } from "../dtos/manufacturer-dto";
import { ModelDto } from "../dtos/model-dto";


@Injectable({ providedIn: 'root' })
export class ProductTypeService extends BackEndService<ProductTypeDto> {

  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_Http,
      environment._STOCK_PRODUCTS,
    );

  }

  getAllIncluded$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('GetProductTypesIncludedAsync', id);
  }

  getProductTypes$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('GetproducttypesAsync', id);
  }

  getSegments$(id: string): Observable<SegmentDto[]> {
    return this.loadById$<SegmentDto[]>('GetSegmentsAsync', id);
  }

  getManufacturers$(id: string): Observable<ManufacturerDto[]> {
    return this.loadById$<ManufacturerDto[]>('GetManufacturersAsync', id);
  }

  getModels$(id: string): Observable<ModelDto[]> {
    return this.loadById$<ModelDto[]>('ModelsAsync', id);
  }



  add(formMain: FormGroup, segment: FormGroup, manufacturer: FormGroup, model: FormGroup) {

    const toSave: ProductTypeDto = { ...formMain.value }

    this.add$<ProductTypeDto>(toSave, 'AddProductTypeAsync').subscribe({
      next: () => {

        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);

        this.resetForms(formMain, segment, manufacturer, model)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }

  private resetForms(formMain: FormGroup, segment: FormGroup, manufacturer: FormGroup, model: FormGroup) {
    formMain.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      userId: this.userId
    });

    segment.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      productId: 0
    })

    manufacturer.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      segmentId: 0
    })

    model.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      manufacturerId: 0
    })
  }

  updateSingle(form: FormGroup) {
    const toSave:ProductTypeDto = { ...form.value }
    this.update$<ProductTypeDto>('UpdateProductTypeAsync',toSave).subscribe({
      next: () => {
        console.log('deu bom')
      }

    })
  }

  saveRangeTypes(formArray: FormArray) {
    const toUpdate = formArray.value;
    const toSave: ProductTypeDto[] = [...toUpdate];
    this.updateRange$<ProductTypeDto>(toSave, 'UpdateProductTypeRangeAsync').subscribe({
      next: () => {
        console.log('deu bom')
      }

    })
  }

}
