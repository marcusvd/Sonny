import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";


import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { SpecificitiesDto } from "../../../dtos/specificities-dto";
import { ex_makeDescription, ex_speed, ex_storage } from "../../common/helpers/product-type-helpers";
import { ProductTypeValidatorAsync } from "../form-validators/product-type-validator-async-fields";


export class FormControllerAddProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _productTypeValidatorAsync: ProductTypeValidatorAsync,
  ) {
    super()
  }

  //Arrays
  speed$ = of(ex_speed);
  storage$ = of(ex_storage);

  //variables
  speedMeasure = ''
  storageMeasure = ''

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
      registered: [new Date(), [Validators.required]],
      manufacturers: this._fb.array([], Validators.required)
    })
  }

  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer?.id ?? 0, [Validators.required]],
      name: [manufacturer?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, [Validators.required]],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      registered: [new Date(), [Validators.required]],
      models: this._fb.array([], Validators.required)
    })
  }

  formLoadModel(model?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [model?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      name: [model?.name ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      manufacturerId: model?.manufacturerId ?? 0,
      registered: [new Date(), [Validators.required]],
      specificities: this.formLoadSpecificities()
    })
  }

  formLoadSpecificities(specificities?: SpecificitiesDto) {
    return this.specificitiesForm = this._fb.group({
      id: [specificities?.id ?? 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      speed: new FormControl({ value: specificities?.speed ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      capacity: new FormControl({ value: specificities?.capacity ?? '', disabled: true }, [Validators.maxLength(this.nameMaxLength)]),
      genaration: ['', []],
      detailedDescription: ['', []],
      description: ['', []],
      manufacturerLink: ['http://', []],
      registered: [new Date(), [Validators.required]],
    })
  }

  makeDescription = () => {
    ex_makeDescription(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm, this.speedMeasure, this.storageMeasure)
  }

  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
  }


  controlReset = false;
  formControlReset = () => {
    this.controlReset = true;
  }


}
