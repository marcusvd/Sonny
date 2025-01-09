import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductTypeDto } from "../../../dtos/product-type-dto";
import { SegmentDto } from "../../../dtos/segment-dto";
import { SpecificitiesDto } from "../../../dtos/specificities-dto";

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
  manufacturers$: Observable<ManufacturerDto[]>;
  models$: Observable<ModelDto[]>;
  specificities$: Observable<SpecificitiesDto[]>;

  //FormsGroup
  productTypeForm: FormGroup;
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificityForm: FormGroup;

  //Validators
  nameMaxLength = 50;
  descriptionMaxLength = 500;

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

  get specificities() {
    return this.modelForm.get('specificities') as FormArray
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

  specificitiesArray = (specificities?: SpecificitiesDto[]) => {
    specificities.forEach(x => this.specificities.push(this.formLoadspecificity(x)));
  }

  clearAllArray = () => {
    this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
    this.productsTypes.clear();
    this.specificities.clear();
  }
  clearFormArraySegmentAndSub = () => {
    // this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
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

  formLoadProductTypeEdit() {
    this.productTypeForm = this._fb.group({
      productsTypes: this._fb.array([])
    })
  }

  formLoad(productType?: ProductTypeDto) {
    this.formMain = this._fb.group({
      id: [productType?.id ?? 0, []],
      name: [productType?.name.toUpperCase(), [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadProductType(entity?: ProductTypeDto) {

    return this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name.toUpperCase(), [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array(entity?.segments ?? []),
      deleted: [entity?.deleted ?? this.minValue, []],
    })
  }

  formLoadSegment(entity?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name.toUpperCase(), [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, []],
      productId: [entity?.productTypeId ?? 0, []],
      manufacturers: this._fb.array([]),
      deleted: [entity?.deleted ?? this.minValue, []],
    })
  }

  formLoadManufacturer(entity?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      name: [entity?.name.toUpperCase() ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      companyId: [this.companyId, []],
      segmentId: [entity?.segmentId ?? 0, []],
      models: this._fb.array([]),
      deleted: [entity?.deleted ?? this.minValue, []],
    })
  }

  formLoadModel(entity?: ModelDto) {
    return this.modelForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      companyId: [this.companyId, []],
      name: [entity?.name.toUpperCase() ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      manufacturerId: entity?.manufacturerId ?? 0,
      specificities: this._fb.array([]),
      deleted: [entity?.deleted ?? this.minValue, []],
    })
  }

  formLoadspecificity(entity?: SpecificitiesDto) {
    return this.specificityForm = this._fb.group({
      id: [entity?.id ?? 0, []],
      companyId: [this.companyId, []],
     // name: [entity?.name.toUpperCase() ?? '', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      speed: [entity?.speed ?? '', [Validators.maxLength(this.nameMaxLength)]],
      capacity: [entity?.capacity ?? '', [Validators.maxLength(this.nameMaxLength)]],
      // modelId: entity?.modelId ?? 0,
      description: [entity?.description ?? '', [Validators.maxLength(this.descriptionMaxLength)]],
      deleted: [entity?.deleted ?? this.minValue, []],
    })
  }

  //SELECT
  onSelectedProduct(id: number) {

    this.manufacturers$ = null;
    this.segments$ = this.productsTypes$.pipe(map(x => x.find(y => y.id == id).segments));

    this.productsTypes$.subscribe((x: ProductTypeDto[]) => {

      const result = x.find(y => y.id == id);

      this.formMain.patchValue(result)
      this.formSegmentArray(result.segments);

    });

    this.clearAllArray();
  }

  onSelectedSegment(id: number) {
    this.clearFormArraySegmentAndSub();

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
    this.models.clear();
    this.manufacturers.clear();

    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == id).models)
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

  onSelectedModel(id: number) {
    this.models.clear();
    this.manufacturers.clear();

    // this.specificities$ = this.models$.pipe(
    //   map(x => x.find(model => model.id == id).specificities)
    // )

    // const arrayToSupply = this.formMain.controls['models'] as FormArray;

    // arrayToSupply.controls.forEach((value, i) => {
    //   if (value.get('id').value == id)
    //     this.models$.subscribe(x => value.get('manufacturers')?.patchValue(x))
    // })

    this.specificities$.subscribe(
      x => {
        this.specificitiesArray(x)
      }

    )

    // this.models$.subscribe(
    //   x => {
    //     this.formModelArray(x)
    //   }
    // )
  }

  controlReset = false;
  formControlReset = () => {
    this.controlReset = !this.controlReset;
  }
}
