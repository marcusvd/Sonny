import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Observable, of } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { map } from "rxjs/operators";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";

import { ProductTypeValidatorAsync } from "./product-type-validator-async-fields";
import validator from "cpf-cnpj-validator";


export class FormControllerProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _productTypeValidatorAsync: ProductTypeValidatorAsync,
  ) {
    super()
  }

  //OBSERVABLES
  products$ = new Observable<ProductTypeDto[]>();
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  //FORMS
  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }

  // get saveOrUpdate() {
  //   return this.productInput != false ? 'Adicionar':'Atualizar'
  // }

  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;


  formLoad(productType?: ProductTypeDto) {
    this.formMain = this._fb.group({
      id: [productType?.id ?? 0, []],
      name: new FormControl(productType?.name, { validators: [Validators.required], asyncValidators:[this._productTypeValidatorAsync.validate.bind(this._productTypeValidatorAsync)] }),
      // name: [productType?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadSegment(segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [segment?.id ?? 0, []],
      name: [segment?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productId: [segment?.productTypeId ?? 0, []],
      manufacturers: this._fb.array([], Validators.required)
    })
  }

  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer?.id ?? 0, []],
      name: [manufacturer?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      models: this._fb.array([], Validators.required)
    })
  }

  formLoadModel(model?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [model?.id ?? 0, []],
      companyId: [this.companyId, []],
      name: [model?.name ?? '', [Validators.required]],
      speed: [model?.speed ?? '', []],
      capacity: [model?.capacity ?? '', []],
      manufacturerId: model?.manufacturerId ?? 0,
      description: [model?.description ?? '', [Validators.required]],
    })
  }

  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
  }

  // clearAllFormArrays() {
  //   this.segments.clear();
  //   this.manufacturers.clear();
  //   this.models.clear();
  // }

  //CHECKBOX
  


}
