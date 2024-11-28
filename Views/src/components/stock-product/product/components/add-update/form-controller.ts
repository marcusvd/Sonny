import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Observable, of } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { map } from "rxjs/operators";
import { ManufacturerDto } from "../../dtos/manufacturer-dto";
import { ModelDto } from "../../dtos/model-dto";
import { ProductDto } from "../../dtos/product-dto";
import { SegmentDto } from "../../dtos/segment-dto";

export class FormController extends BaseForm {
  constructor(
    private _fb: FormBuilder,

  ) {
    super()
  }

  //OBSERVABLES
  products$ = new Observable<ProductDto[]>();
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  //BOOLEANS
  productInput = false;
  productformControlReset = false;

  segmentMatSelect = false;
  segmentInput = false;
  segmentFormControlReset = false;

  manufacturerFormControlReset = false;
  manufacturerMatSelect = false;
  manufacturerInput = false;

  modelFormControlReset = false;
  modelMatSelect = false;
  modelInput = false;
  description = false;


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

  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;


  formLoad(productType?: ProductDto) {
    this.formMain = this._fb.group({
      id: [productType?.id ?? 0, []],
      name: [productType?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }

  formLoadSegment(segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [segment?.id ?? 0, []],
      name: [segment?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productId: [segment?.productId ?? 0, []],
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
      name: [model?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      manufacturerId: model?.manufacturerId ?? 0,
      description: [model?.description ?? '', [Validators.required]],
    })
  }

  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment())
    this.manufacturers.push(this.formLoadManufacturer())
    this.models.push(this.formLoadModel())
  }

  clearAllFormArrays() {
    this.segments.clear();
    this.manufacturers.clear();
    this.models.clear();
  }

  //CHECKBOX
  productCheckbox(checked: MatCheckboxChange) {
    this.input(['product','segment', 'manufacturer', 'model', 'description'], checked.checked);
    
    this.formMain.reset({
      id: 0,
      name: '',
      companyId: this.companyId
    });

    if (checked.checked) {
      this.matSelect(['segment', 'manufacturer', 'model'], false);

      this.formControlReset('product', checked.checked);

      this.clearAllFormArrays();
      this.addEmptyFormArrays();
    }

    else {
      this.clearAllFormArrays();
      this.formControlReset('product', checked.checked);
    }
  }

  segmentCheckbox(checked: MatCheckboxChange) {
    this.input(['manufacturer', 'model', 'description'], checked.checked);
   
    if (checked.checked) {
  
      this.matSelect(['segment', 'manufacturer', 'model'], false);
      this.input(['segment'], checked.checked);
   
      this.formControlReset('segment', checked.checked);

      this.clearAllFormArrays();
      this.addEmptyFormArrays();
    }
    else {
      this.matSelect(['segment'], true);
      this.input(['segment'], checked.checked);
     
      this.formControlReset('segment', checked.checked);

      this.clearAllFormArrays();

    }
  }


  manufacturerCheckbox(checked: MatCheckboxChange) {
    this.input(['model', 'description'], checked.checked);
   
    if (checked.checked) {
      this.matSelect(['manufacturer', 'model'], false);
      this.input(['manufacturer'], checked.checked);

      this.formControlReset('manufacturer', checked.checked);

      this.manufacturers.clear();
      this.models.clear();

      this.manufacturers.push(this.formLoadManufacturer());
      this.models.push(this.formLoadModel());
    }
    else {
      this.matSelect(['manufacturer'], true);
      this.input(['manufacturer'], checked.checked);

      this.formControlReset('manufacturer', checked.checked);

      this.manufacturers.clear();
      this.models.clear();
    }
  }

  modelCheckbox(checked: MatCheckboxChange) {
    this.input(['description'], checked.checked);

    if (checked.checked) {
      this.matSelect(['model'], false);
      this.input(['model'], checked.checked);

      this.models.push(this.formLoadModel())
      this.formControlReset('model', checked.checked);
      
      this.models.clear();

    }
    else {
      this.matSelect(['model'], true);
      this.input(['model'], checked.checked);
      this.formControlReset('model', checked.checked);

      this.models.clear();
    }
  }

  //SELECT
  onSelectedProduct(productSelected: ProductDto) {
    this.matSelect(['segment'], true);

    this.segments$ = of(productSelected.segments);
    this.formLoad(productSelected);
  }

  onSelectedSegment(segmentId: number) {

    this.matSelect(['manufacturer'], true);

    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == segmentId).manufacturers)
    )
    this.segments$.subscribe(
      x => {
        const setSegment = x.find(segment => segment.id == segmentId)
        this.segments.push(this.formLoadSegment(setSegment));
      }
    )
  }

  onSelectedManufacturer(manufacturerId: number) {

    this.matSelect(['model'], true);

    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
    )
    this.manufacturers$.subscribe(
      x => {
        const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
        this.manufacturers.push(this.formLoadManufacturer(manufacturer));
      }
    )
  }

  onSelectedModel(modelId: number) {

    if (modelId > 0)
      this.input(['description'], true);

    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId);
        this.models.push(this.formLoadModel(model));
      }
    )
  }

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

  private matSelect = (item: string[], checked: boolean) => {

    item.forEach(x => {
      if (x == 'segment')
        this.segmentMatSelect = checked;

      if (x == 'manufacturer')
        this.manufacturerMatSelect = checked;

      if (x == 'model')
        this.modelMatSelect = checked;
    })

  }

  private input = (item: string[], checked: boolean) => {

    item.forEach(x => {
      if (x == 'product')
        this.productInput = checked;

      if (x == 'segment')
        this.segmentInput = checked;

      if (x == 'manufacturer')
        this.manufacturerInput = checked;

      if (x == 'model')
        this.modelInput = checked;

      if (x == 'description')
        this.description = checked;
    })

  }


}
