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
import { SpecificitiesDto } from "../../../dtos/specificities-dto";


export class FormControllerAddProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _productTypeValidatorAsync: ProductTypeValidatorAsync,
  ) {
    super()
  }


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
  get specificities() {
    return this.modelForm.get('specificities') as FormArray
  }


  //FormGroups
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificitiesForm: FormGroup;

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;

  formLoad(productType?: ProductTypeDto) {
    this.formMain = this._fb.group({
      id: [productType?.id ?? 0, [Validators.required]],
      name: new FormControl(productType?.name, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validate.bind(this._productTypeValidatorAsync)] }),
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadSegment(segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [segment?.id ?? 0, [Validators.required]],
      name: [segment?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, [Validators.required]],
      productId: [segment?.productTypeId ?? 0, []],
      manufacturers: this._fb.array([], Validators.required)
    })
  }

  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer?.id ?? 0, [Validators.required]],
      name: [manufacturer?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, [Validators.required]],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      models: this._fb.array([], Validators.required)
    })
  }

  formLoadModel(model?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [model?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      name: [model?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      manufacturerId: model?.manufacturerId ?? 0,
      specificities: this._fb.array([], Validators.required)
    })
  }

  formLoadSpecificities(specificities?: SpecificitiesDto) {
    return this.specificitiesForm = this._fb.group({
      id: [specificities?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      speed: [specificities?.speed ?? '', [Validators.maxLength(this.nameMaxLength)]],
      capacity: [specificities?.capacity ?? '', [Validators.maxLength(this.nameMaxLength)]],
      modelId: specificities?.modelId ?? 0,
    })
  }

  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
    this.specificities.push(this.formLoadSpecificities())
  }


  controlReset = false;
  formControlReset = () => {
      this.controlReset = !this.controlReset;
  }


}
