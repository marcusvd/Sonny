import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductTypeEdit } from "../../dtos/produc-type-edit";
import { SpecificitiesDto } from "../../dtos/specificities-dto";
import { ValidatorsProductTypeEditAsyncField } from "../form-validators/validators-product-type-edit-async-field";


//Validators

@Injectable({ providedIn: 'root' })
export class FormsBuilderHelperAddNewChildProductTypeService {
  
  constructor(private readonly _validatorsAsyncField: ValidatorsProductTypeEditAsyncField) {
    
  }
  
  private nameMaxLength = 50;
  private descriptionMaxLength = 500;

  formLoad = (companyId: number, userId: number, productType?: ProductTypeEdit) => {
    return new FormGroup({
      id: new FormControl(productType?.productTypeId ?? 0, { validators: [Validators.required] }),
      name: new FormControl(productType?.productTypeName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)] }),
      companyId: new FormControl(companyId, { validators: [Validators.required] }),
      userId: new FormControl(userId, { validators: [Validators.required] }),
      segments: new FormArray([this.formLoadSegment(companyId, productType)], Validators.required)
    })
  }

  private formLoadSegment = (companyId: number, productType?: ProductTypeEdit) => {

    return new FormGroup({
      id: new FormControl(productType?.segmentId ?? 0, Validators.required),
      name: new FormControl(productType?.segmentName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateSegmentAsync(productType?.productTypeId)] }),
      companyId: new FormControl(companyId, { validators: [Validators.required] }),
      productId: new FormControl(0),
      registered: new FormControl(new Date(), [Validators.required]),
      manufacturers: new FormArray([this.formLoadManufacturer(companyId, productType)], Validators.required)
    })
  }

  private formLoadManufacturer = (companyId: number, productType?: ProductTypeEdit) => {

    return new FormGroup({
      id: new FormControl(productType?.manufacturerId ?? 0, Validators.required),
      name: new FormControl(productType?.manufacturerName, { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateManufacturerAsync(productType?.segmentId)] }),
      companyId: new FormControl(companyId, { validators: [Validators.required] }),
      segmentId: new FormControl(0),
      registered: new FormControl(new Date(), [Validators.required]),
      models: new FormArray([this.formLoadModel(companyId, productType)], Validators.required)
    })
  }

  private formLoadModel = (companyId: number, productType?: ProductTypeEdit) => {

    return new FormGroup({
      id: new FormControl(0, { validators: [Validators.required] }),
      companyId: new FormControl(companyId, { validators: [Validators.required] }),
      name: new FormControl('', { validators: [Validators.required, Validators.maxLength(this.nameMaxLength)], asyncValidators: [this._validatorsAsyncField.validateModelAsync(productType?.manufacturerId)] }),
      manufacturerId: new FormControl(0),
      registered: new FormControl(new Date(), [Validators.required]),
      specificities: this.formLoadSpecificities(companyId, null)
    })
  }


  private formLoadSpecificities = (companyId: number, specificities?: SpecificitiesDto) => {

    return new FormGroup({
      id: new FormControl(specificities?.id ?? 0, { validators: [Validators.required] }),
      companyId: new FormControl(companyId, { validators: [Validators.required] }),
      speed: new FormControl({ value: specificities?.speed ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: specificities?.capacity ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      generation: new FormControl(''),
      description: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(this.descriptionMaxLength)]),
      detailedDescription: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      manufacturerLink: new FormControl('http://', [Validators.maxLength(this.descriptionMaxLength)]),
      registered: new FormControl(new Date(), [Validators.required]),
    })
  }

}
