import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";


import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { ProductTypeValidatorAsync } from "../form-validators/product-type-validator-async-fields";


//Validators

@Injectable({ providedIn: 'root' })
export class FormsBuilderHelperAddProductTypeService {

  constructor(
    private readonly _productTypeValidatorAsync: ProductTypeValidatorAsync,
    private readonly _fb: FormBuilder
  ) {

  }

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;


  formLoad(companyId: number, userId: number, productType?: ProductTypeDto) {
    return this._fb.group({
      id: [productType?.id ?? 0, [Validators.required]],
      name: new FormControl(productType?.name, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validate.bind(this._productTypeValidatorAsync)] }),
      companyId: [companyId, [Validators.required]],
      userId: [userId, [Validators.required]],
      segments: this._fb.array([this.formLoadSegment(companyId)], Validators.required)
    })
  }

  private formLoadSegment(companyId: number, segment?: SegmentDto) {
    return this._fb.group({
      id: [segment?.id ?? 0, [Validators.required]],
      name: [segment?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [companyId, [Validators.required]],
      productId: [segment?.productTypeId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([this.formLoadManufacturer(companyId)], Validators.required)
    })
  }

  private formLoadManufacturer(companyId: number, manufacturer?: ManufacturerDto) {
    return this._fb.group({
      id: [manufacturer?.id ?? 0, [Validators.required]],
      name: [manufacturer?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [companyId, [Validators.required]],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([this.formLoadModel(companyId)], Validators.required)
    })
  }

  private formLoadModel(companyId: number, model?: ModelDto) {
    return this._fb.group({
      id: [model?.id ?? 0, [Validators.required]],
      companyId: [companyId, [Validators.required]],
      name: [model?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      manufacturerId: model?.manufacturerId ?? 0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities(companyId)
    })
  }

  private formLoadSpecificities(companyId: number) {
    return this._fb.group({
      id: [0, [Validators.required]],
      companyId: [companyId, [Validators.required]],
      speed: new FormControl({ value: '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      generation: ['', []],
      detailedDescription: ['', []],
      description: new FormControl('', [Validators.required, Validators.maxLength(this.descriptionMaxLength)]),
      manufacturerLink: ['http://', []],
      registered: [new Date(), [Validators.required]],
    })
  }


}
