import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Observable, of } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { map } from "rxjs/operators";
import { ProductDto } from "../../../dtos/product";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { Router } from "@angular/router";

export class FormControllerEditProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,
    public _router: Router
  ) {
    super()
  }

  //OBSERVABLES
  productsTypes$ = new Observable<ProductTypeDto[]>();
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  //BOOLEANS
  productformControlReset = false;

  segmentFormControlReset = false;

  manufacturerFormControlReset = false;

  modelFormControlReset = false;

  description = false;

  //FormControls
  productTypeFormControl = new FormControl()
  segmentFormControl = new FormControl()
  manufacturerFormControl = new FormControl()
  modelFormControl = new FormControl()
  speedFormControl = new FormControl()
  capacityFormControl = new FormControl()
  descriptionFormControl = new FormControl()

  //CHECKS
  valueType = "product-type"
  labelProduct = "Tipo de produto";
  valueSegment = "segment"
  labelSegment = "Segmento";
  valueManufacturer = "manufacturer"
  labelManufacturer = "Fabricante";
  valueModel = "model"
  labelModel = "Modelo";


  //FORMS
  get productsTypes() {
    return this.productTypeForm.get('productsTypes') as FormArray
  }

  get segments() {
    return this.formMain.get('segments') as FormArray
  }
  get manufacturers() {
    return this.segmentForm.get('manufacturers') as FormArray
  }
  get models() {
    return this.manufacturerForm.get('models') as FormArray
  }

  formProductTypePushArray(x: ProductTypeDto[]) {
    x.forEach(y => this.productsTypes.push(this.formLoadProductType(y)))
  }

  formSegmentArray = (segment?: SegmentDto[]) => {
    segment.forEach(x => this.segments.push(this.formLoadSegment(x)));
  }

  formManufacturerArray = (manufacturer?: ManufacturerDto[]) => {
    manufacturer.forEach(x => this.manufacturers.push(this.formLoadManufacturer(x)));
  }

  formModelArray = (model?: ModelDto[]) => {
    model.forEach(x => this.models.push(this.formLoadModel(x)));
  }

  clearAllArray = () => {
    this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
    this.productsTypes.clear();
  }

  addAddItemArray = (arrayEntity: string) => {

    if (arrayEntity == 'type')
      this._router.navigate(['/side-nav/stock-product-router/add-product-type']);

    if (arrayEntity == 'segment')
      this.segments.push(this.formLoadSegment())

    if (arrayEntity == 'manufacturer')
      this.manufacturers.push(this.formLoadManufacturer())

    if (arrayEntity == 'model')
      this.models.push(this.formLoadModel())

  }

  removeItemArray = (arrayEntity: string, index: number, formArray: FormArray) => {

    if (arrayEntity == 'type')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'segment')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'manufacturer')
      this.removeItemArrayHelper(index, formArray);

    if (arrayEntity == 'model')
      this.removeItemArrayHelper(index, formArray);

  }

  private removeItemArrayHelper = (index: number, formArray: FormArray) => {

    formArray.controls.forEach((value, i) => {
      console.log(value.valid)
      if (index == i) {
        value.get('deleted').setValue(new Date());

        if (!value.valid)
          formArray.removeAt(index);

        if (value.valid && value.value.id == 0)
          formArray.removeAt(index);
      }
    })

  }

  isDeleted(deletedValue: string) {
    const deleted = new Date(deletedValue).getFullYear();
    return deleted != 1;
  }


  productTypeForm: FormGroup;
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;

  formLoadProductTypeEdit() {
    this.productTypeForm = this._fb.group({
      productsTypes: this._fb.array([])
    })
  }
  
  formLoad(productType?: ProductTypeDto) {
    this.formMain = this._fb.group({
      id: [productType?.id ?? 0, []],
      name: [productType?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadProductType(entity?: ProductTypeDto) {

    return this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([entity?.segments]),
      deleted: [entity?.deleted ?? this.minValue.setHours(0,0,0), []],
    })

    // this.formSegmentArray(entity.segments);
  }

  formLoadSegment(entity?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productId: [entity?.productTypeId ?? 0, []],
      manufacturers: this._fb.array(entity?.manufacturers ?? []),
      deleted: [entity?.deleted ?? this.minValue.setHours(0,0,0), []],
    })
  }

  formLoadManufacturer(entity?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      segmentId: [entity?.segmentId ?? 0, []],
      models: this._fb.array([], Validators.required),
      deleted: [entity?.deleted ?? this.minValue.setHours(0,0,0), []],
    })
  }

  formLoadModel(entity?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      companyId: [this.companyId, []],
      name: [entity?.name ?? '', [Validators.required]],
      speed: [entity?.speed ?? '', []],
      capacity: [entity?.capacity ?? '', []],
      manufacturerId: entity?.manufacturerId ?? 0,
      description: [entity?.description ?? '', [Validators.required]],
      deleted: [entity?.deleted ?? this.minValue.setHours(0,0,0), []],
    })
  }

  //SELECT
  onSelectedProduct(productSelected: ProductTypeDto) {
    this.formMain.patchValue(productSelected)
    this.segments$ = of(productSelected.segments);
    this.clearAllArray();
    this.formSegmentArray(productSelected.segments)
  }

  onSelectedSegment(id: number) {
    // this.clearAllArray();

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == id).manufacturers)
    )

    const arrayToSupply = this.formMain.controls['segments'] as FormArray;

    arrayToSupply.controls.forEach((value, i) => {
      if (value.get('id').value == id)
        this.manufacturers$.subscribe(x => value.get('manufacturers')?.patchValue(x))
    })


    this.manufacturers$.subscribe(
      x => this.formManufacturerArray(x)
    )



  }



  onSelectedManufacturer(id: number) {

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == id).manufacturers)
    )

    const arrayToSupply = this.formMain.controls['segments'] as FormArray;

    arrayToSupply.controls.forEach((value, i) => {
      if (value.get('id').value == id)
        this.manufacturers$.subscribe(x => value.get('manufacturers')?.patchValue(x))
    })

    this.manufacturers$.subscribe(
      x => this.formManufacturerArray(x)
    )

    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == id).models)
    )

    this.models$.subscribe(
      x => {
        this.formModelArray(x)
      }
    )
  }

  // onSelectedModel(modelId: number) {

  //   this.models$.subscribe(
  //     x => {
  //       const model = x.find(model => model.id == modelId);
  //      // this.formMain.get('modelId').setValue(modelId);
  //     }
  //   )
  // }

  private formControlReset = (item: string, checked: boolean) => {
    if (item == 'product') {
      this.productformControlReset = checked;
      this.segmentFormControlReset = checked;
      this.manufacturerFormControlReset = checked;
      this.modelFormControlReset = checked;
    }

    if (item == 'segment') {
      this.segmentFormControlReset = checked;
      this.manufacturerFormControlReset = checked;
      this.modelFormControlReset = checked;
    }

    if (item == 'manufacturer') {
      this.manufacturerFormControlReset = checked;
      this.modelFormControlReset = checked;
    }

    if (item == 'model')
      this.modelFormControlReset = checked;

  }
}
