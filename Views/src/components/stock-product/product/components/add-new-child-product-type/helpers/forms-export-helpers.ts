import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { SpecificitiesDto } from "../../../dtos/specificities-dto"
import { Inject } from "@angular/core"
import { ProductTypeEdit } from "../../../dtos/produc-type-edit";
import { ValidatorsProductTypeEditAsyncField } from "../form-validators/validators-product-type-edit-async-field";

let _fb =  Inject(new FormBuilder());
let _validatorsAsyncField = Inject(ValidatorsProductTypeEditAsyncField);

//Validators
const nameMaxLength = 50;
const descriptionMaxLength = 500;


export const ex_formLoad = (companyId: number, userId: number, productType?: ProductTypeEdit) => {

  let form:FormGroup = null;

  return form = _fb.group({
    id: [productType?.productTypeId ?? 0, [Validators.required]],
    name: new FormControl(productType?.productTypeName, { validators: [Validators.required, Validators.maxLength(nameMaxLength)] }),
    companyId: [companyId, [Validators.required]],
    userId: [userId, [Validators.required]],
    segments: _fb.array([], Validators.required)
  })
}

export const ex_formLoadSegment = (companyId: number, productType?: ProductTypeEdit) => {

  let form:FormGroup = null;

  return form = _fb.group({
    id: [productType?.segmentId ?? 0, [Validators.required]],
    name: new FormControl(productType?.segmentName, { validators: [Validators.required, Validators.maxLength(nameMaxLength)], asyncValidators: [_validatorsAsyncField.validateSegmentAsync(productType?.productTypeId)] }),
    companyId: [companyId, [Validators.required]],
    productId: [0, []],
    registered: [new Date(), [Validators.required]],
    manufacturers: _fb.array([], Validators.required)
  })
}

export const ex_formLoadManufacturer = (companyId: number, productType?: ProductTypeEdit) => {

  let form:FormGroup = null;

  return form = _fb.group({
    id: [productType?.manufacturerId ?? 0, [Validators.required]],
    name: new FormControl(productType?.manufacturerName, { validators: [Validators.required, Validators.maxLength(nameMaxLength)], asyncValidators: [_validatorsAsyncField.validateManufacturerAsync(productType?.segmentId)] }),
    companyId: [companyId, [Validators.required]],
    segmentId: [0, []],
    registered: [new Date(), [Validators.required]],
    models: _fb.array([], Validators.required)
  })
}

export const ex_formLoadModel = (companyId: number, productType?: ProductTypeEdit) => {

  let form:FormGroup = null;

  return form = _fb.group({
    id: [0, [Validators.required]],
    companyId: [companyId, [Validators.required]],
    name: new FormControl('', { validators: [Validators.required, Validators.maxLength(nameMaxLength)], asyncValidators: [_validatorsAsyncField.validateModelAsync(productType?.manufacturerId)] }),
    manufacturerId: 0,
    registered: [new Date(), [Validators.required]],
    specificities: formLoadSpecificities(companyId, null)
  })
}


const formLoadSpecificities = (companyId: number, specificities?: SpecificitiesDto) => {

  let form:FormGroup = null;

  return form = _fb.group({
    id: [specificities?.id ?? 0, [Validators.required]],
    companyId: [companyId, [Validators.required]],
    speed: new FormControl({ value: specificities?.speed ?? '', disabled: true }, [Validators.maxLength(nameMaxLength)]),
    capacity: new FormControl({ value: specificities?.capacity ?? '', disabled: true }, [Validators.maxLength(nameMaxLength)]),
    generation: ['', []],
    description: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(descriptionMaxLength)]),
    detailedDescription: ['', []],
    manufacturerLink: ['http://', []],
    registered: [new Date(), [Validators.required]],
  })
}
