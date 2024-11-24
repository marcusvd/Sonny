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
  constructor(private _fb: FormBuilder) {
    super()
  }

  //OBSERVABLES
  products$ = new Observable<ProductDto[]>();
  segments$: Observable<SegmentDto[]>;
  manufacturers$: Observable<ManufacturerDto[]>
  models$: Observable<ModelDto[]>

  //BOOLEANS
  product = false;
  segmentUpd = false;
  manufacturerUpd = false;
  modelUpd = false;
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
      segments: this._fb.array([])
    })
  }

  formLoadSegment(segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [segment?.id ?? 0, []],
      name: [segment?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productId: [segment?.productId ?? 0, []],
      manufacturers: this._fb.array([])
    })
  }

  formLoadManufacturer(manufacturer?: ManufacturerDto) {
    return this.manufacturerForm = this._fb.group({
      id: [manufacturer?.id ?? 0, []],
      name: [manufacturer?.name ?? '', [Validators.required]],
      companyId: [this.companyId, []],
      segmentId: [manufacturer?.segmentId ?? 0, []],
      models: this._fb.array([])
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
    this.product = checked.checked;
    this.segmentUpd = checked.checked;
    this.manufacturerUpd = checked.checked;
    this.modelUpd = checked.checked;
    this.description = checked.checked;
    if (checked.checked) {
      this.formMain.reset({
        id: 0,
        name: '',
        companyId: this.companyId
      });
      this.clearAllFormArrays();
      this.addEmptyFormArrays();
    }
    else {
      this.clearAllFormArrays();
      this.manufacturers$ = null;
      this.models$ = null;
    }
  }

  segmentCheckbox(checked: MatCheckboxChange) {
    this.segmentUpd = checked.checked;
    this.manufacturerUpd = checked.checked;
    this.modelUpd = checked.checked;
    this.description = checked.checked;

    if (checked.checked) {
      this.clearAllFormArrays();
      this.addEmptyFormArrays();
    }
    else {
      this.clearAllFormArrays();
      this.manufacturers$ = null;
      this.models$ = null;
    }
  }

  manufacturerCheckbox(checked: MatCheckboxChange) {

    this.manufacturerUpd = checked.checked;
    this.modelUpd = checked.checked;
    this.description = checked.checked;

    if (checked.checked) {
      this.manufacturers.clear();
      this.models.clear();

      this.manufacturers.push(this.formLoadManufacturer());
      this.models.push(this.formLoadModel());
    }
    else {
      this.manufacturers.clear();
      this.models.clear();
      // this.manufacturers$
      // this.models$
    }
  }

  modelCheckbox(checked: MatCheckboxChange) {
    this.modelUpd = checked.checked;
    this.description = checked.checked;

    if (checked.checked) {
      this.models.clear();
      this.models.push(this.formLoadModel())
    }
    else
      this.models.clear();
  }

  //SELECT
  onSelectedProductType(productSelected: ProductDto) {
    this.segments$ = of(productSelected.segments);
    this.formLoad(productSelected);
  }

  onSelectedSegment(segmentId: number) {

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
      this.description = true;

    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId);
        this.models.push(this.formLoadModel(model));
      }
    )
  }

}
