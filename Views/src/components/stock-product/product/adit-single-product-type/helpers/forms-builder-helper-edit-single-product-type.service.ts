import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductTypeDto } from "../../dtos/product-type-dto";
import { SegmentDto } from "../../dtos/segment-dto";
import { ProductTypeValidatorAsync } from "../form-validators/product-type-validator-async-fields";
import { SpecificitiesDto } from "../../dtos/specificities-dto";


//Validators

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
      name: new FormControl(productType?.name, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._productTypeValidatorAsync.validate.bind(this._productTypeValidatorAsync)] }),
      companyId: [productType.companyId, [Validators.required]],
      userId: [productType.userId, [Validators.required]],
      segments: this._fb.array([this.formLoadSegment(productType.segments[0])], Validators.required)
    })
  }

   formLoadSegment(segment?: SegmentDto) {
    return this._fb.group({
      id: [segment?.id ?? 0, [Validators.required]],
      name: [segment?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [segment.companyId, [Validators.required]],
      productId: [segment?.productTypeId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([this.formLoadManufacturer(segment.manufacturers[0])], Validators.required)
    })
  }

   formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this._fb.group({
      id: [manufacturer?.id ?? 0, [Validators.required]],
      name: [manufacturer?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [manufacturer.companyId, [Validators.required]],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([this.formLoadModel(manufacturer.models[0])], Validators.required)
    })
  }

   formLoadModel(model?: ModelDto) {
    console.log(model)
    return this._fb.group({
      id: [model?.id ?? 0, [Validators.required]],
      companyId: [model.companyId, [Validators.required]],
      name: [model?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      manufacturerId: model?.manufacturerId ?? 0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities(model.specificities)
    })
  }

   formLoadSpecificities(specificities: SpecificitiesDto) {
    return this._fb.group({
      id: [0, [Validators.required]],
      companyId: [specificities.companyId, [Validators.required]],
      speed: new FormControl({ value: specificities.speed, disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: specificities.capacity, disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      generation: [specificities.generation, []],
      detailedDescription: [specificities.detailedDescription, []],
      description: new FormControl({ value: specificities.description, disabled: true }, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]),
      manufacturerLink: [specificities.manufacturerLink, []],
      registered: [specificities.registered, [Validators.required]],
    })
  }


}
