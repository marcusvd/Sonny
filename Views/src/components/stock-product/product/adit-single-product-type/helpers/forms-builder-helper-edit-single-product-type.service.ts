import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";


import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { ProductTypeValidatorAsync } from "../form-validators/product-type-validator-async-fields";
import { SpecificitiesDto } from "../../dtos/specificities-dto";


@Injectable({ providedIn: 'root' })
export class FormsBuilderHelperEditSingleProductTypeService {

  constructor(
    private readonly _productTypeValidatorAsync: ProductTypeValidatorAsync,
    private readonly _fb: FormBuilder
  ) {

  }

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;

  formLoad(productType?: ProductTypeDto) {
    return this._fb.group({
      id: [productType?.id ?? 0, [Validators.required]],
      name: new FormControl(productType?.name, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validateProductType(productType)] }),
      companyId: [productType.companyId, [Validators.required]],
      userId: [productType.userId, [Validators.required]],
      segments: this._fb.array([this.formLoadSegment(productType.segments[0], productType.id)], Validators.required)
    })
  }

  formLoadSegment(segment?: SegmentDto, productTypeId?: number) {
    return this._fb.group({
      id: [segment?.id ?? 0, [Validators.required]],
      name: new FormControl(segment?.name ?? '', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validateSegmentAsync(productTypeId, segment.id)] }),
      companyId: [segment.companyId, [Validators.required]],
      productId: [segment?.productTypeId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([this.formLoadManufacturer(productTypeId, segment.id, segment.manufacturers[0])], Validators.required)
    })
  }

  formLoadManufacturer(productTypeId: number, segmentId: number, manufacturer?: ManufacturerDto) {
    return this._fb.group({
      id: [manufacturer?.id ?? 0, [Validators.required]],
      name: new FormControl(manufacturer?.name ?? '', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validatorManufacturer(productTypeId, segmentId, manufacturer.id)] }),
      companyId: [manufacturer.companyId, [Validators.required]],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([this.formLoadModel(productTypeId, segmentId, manufacturer.id, manufacturer.models[0])], Validators.required)
    })
  }

  formLoadModel(roductTypeId: number, segmentId: number, manufacturerId: number, model: ModelDto) {
    return this._fb.group({
      id: [model?.id ?? 0, [Validators.required]],
      companyId: [model.companyId, [Validators.required]],
      name: new FormControl(model?.name ?? '', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validatorModel(roductTypeId, segmentId, manufacturerId, model.id)] }),
      manufacturerId: model?.manufacturerId ?? 0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities(model.specificities)
    })
  }

  formLoadSpecificities(specificities: SpecificitiesDto) {
    return this._fb.group({
      id: [0, [Validators.required]],
      companyId: [specificities.companyId, [Validators.required]],
      // speed: new FormControl(specificities.speed, [Validators.maxLength(this.nameMaxLength)]),
      // capacity: new FormControl(specificities.capacity, [Validators.maxLength(this.nameMaxLength)]),
      // generation: [specificities.generation, []],
      detailedDescription: [specificities.detailedDescription, []],
      description: new FormControl(specificities.description, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]),
      manufacturerLink: [specificities.manufacturerLink, []],
      registered: [specificities.registered, [Validators.required]],
    })
  }



}
