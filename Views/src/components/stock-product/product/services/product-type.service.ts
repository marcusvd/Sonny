import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


import { FormArray, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ManufacturerDto } from "../dtos/manufacturer-dto";
import { ModelDto } from "../dtos/model-dto";
import { ProductTypeDto } from "../dtos/product-type-dto";
import { SegmentDto } from "../dtos/segment-dto";
import { ProductDto } from "../dtos/product-dto";


@Injectable({ providedIn: 'root' })
export class ProductTypeService extends BackEndService<ProductTypeDto> {

  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_Http,
      environment._BACK_END_ROOT_URL,
      // environment._STOCK_PRODUCTS,
    );

  }

  getAllIncluded$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('_PD_Products/GetProductTypesIncludedAsync', id);
  }

  getProductTypes$(id: string): Observable<ProductTypeDto[]> {
    return this.loadById$<ProductTypeDto[]>('_PD_Products/GetproducttypesAsync', id);
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



  add(formMain: FormGroup, segment: FormGroup, manufacturer: FormGroup, model: FormGroup, specificitiesForm: FormGroup) {

    const toSave: ProductTypeDto = { ...formMain.value }
    // console.log(toSave)

    this.add$<ProductTypeDto>(toSave, '_PD_Products/AddProductTypeAsync').subscribe({
      next: () => {

        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);

        this.resetForms(formMain, segment, manufacturer, model, specificitiesForm)

      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }

  private resetForms(formMain: FormGroup, segment: FormGroup, manufacturer: FormGroup, model: FormGroup, specificitiesForm: FormGroup) {
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
      productId: 0,
      registered:new Date()
    })

    manufacturer.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      segmentId: 0,
      registered:new Date()
    })

    model.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      manufacturerId: 0,
      registered:new Date()
    })

    specificitiesForm.reset({
      id: 0,
      name: '',
      companyId: this.companyId,
      modelId: 0,
      registered:new Date()
    })
    specificitiesForm.get('speed').disable();
    specificitiesForm.get('capacity').disable();
  }

  updateSingle(form: FormGroup) {
    const toSave:ProductTypeDto = { ...form.value }
    this.update$<ProductTypeDto>('_PD_Products/UpdateProductTypeAsync',toSave).subscribe({
      next: () => {
        console.log('deu bom')
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }
  updateSingleTest(form: FormGroup, formToAddArrayUpdate: FormGroup) {
    const toSave:ProductTypeDto = { ...form.value }
    toSave.products = [];

    const toSaveTest:ProductDto = { ...formToAddArrayUpdate.value }

    toSave.products.push(toSaveTest);


    this.update$<ProductTypeDto>('_PD_Products/UpdateProductTypeAsync',toSave).subscribe({
      next: () => {
        console.log('deu bom')
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }

  // saveRangeSegments(formArray: FormArray) {
  //   const toUpdate = formArray.value;
  //   const toSave: ProductTypeDto[] = [...toUpdate];
  //   this.updateRange$<ProductTypeDto>(toSave, '_PD_ProductChildren/UpdateSegmentRangeAsync').subscribe({
  //     next: () => {
  //       this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
  //     },
  //     error: (erroCode) => {
  //       console.log(erroCode)
  //       this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
  //     }

  //   })
  // }
  updateRangeTypes(formArray: FormArray) {
    const toUpdate = formArray.value;
    const toSave: ProductTypeDto[] = [...toUpdate];
    this.updateRange$<ProductTypeDto>(toSave, '_PD_Products/UpdateProductTypeRangeAsync').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }

    })
  }

}

