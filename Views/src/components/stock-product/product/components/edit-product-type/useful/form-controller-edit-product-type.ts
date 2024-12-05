import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { Observable, of } from "rxjs";
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


import { map } from "rxjs/operators";
import { ProductDto } from "../../../dtos/product";
import { SegmentDto } from "../../../dtos/segment-dto";
import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
import { ModelDto } from "../../../dtos/model-dto";
import { ProductTypeDto } from "../../../dtos/product-type-dto";

export class FormControllerEditProductType extends BaseForm {
  constructor(
    private _fb: FormBuilder,

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

  addSegment = ()=>{
    this.segments.push(this.formLoadSegment())
  } 

  removeSegment = (index:number)=>{
    this.segments.removeAt(index);
  } 

  productTypeForm: FormGroup;
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;

formLoadProductTypeEdit(){
  this.productTypeForm = this._fb.group({
    productsTypes:this._fb.array([])
  })
}

get arrayProductType(){
 return this.productTypeForm.get('productsTypes') as FormArray
}

  formProductTypePushArray (x: ProductTypeDto[]) {
   x.forEach(y => this.arrayProductType.push(this.formLoadProductType(y)))

  }
  
  formLoadProductType(productType?: ProductTypeDto) {
   return this._fb.group({
      id: [productType?.id ?? 0, []],
      name: [productType?.name, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      segments: this._fb.array([], Validators.required)
    })
  }
  // formLoad(productType?: ProductTypeDto) {
  //   this.formMain = this._fb.group({
  //     id: [productType?.id ?? 0, []],
  //     name: [productType?.name, [Validators.required]],
  //     companyId: [this.companyId, [Validators.required]],
  //     userId: [this.userId, [Validators.required]],
  //     segments: this._fb.array([], Validators.required)
  //   })
  // }



  formSegmentArray = (segment?: SegmentDto[]) => {
    segment.forEach(x => this.segments.push(this.formLoadSegment(x)));
  }

  formLoadSegment(segment?: SegmentDto) {
    return this.segmentForm = this._fb.group({
      id: [segment?.id ?? 0, []],
      name: [segment?.name, [Validators.required]],
      companyId: [this.companyId, []],
      productId: [segment?.productTypeId ?? 0, []],
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
      companyId: [this.companyId, []],
      name: [model?.name ?? '', [Validators.required]],
      speed: [model?.speed ?? '', []],
      capacity: [model?.capacity ?? '', []],
      manufacturerId: model?.manufacturerId ?? 0,
      description: [model?.description ?? '', [Validators.required]],
    })
  }

 

  //SELECT
  onSelectedProduct(productSelected: ProductTypeDto) {
    this.segments$ = of(productSelected.segments);
    this.segments.clear();
    this.formSegmentArray(productSelected.segments)
    // this.formMain.get('name').patchValue(productSelected.name);
  }

  onSelectedSegment(segmentId: number) {
    this.manufacturers$ = this.segments$.pipe(
      map(x => x.find(segment => segment.id == segmentId).manufacturers)
    )
    // this.manufacturers$.subscribe(
    //   x=> console.log(x)
    // )
  //  this.formMain.get('segmentId').setValue(segmentId);
    // this.segments$.subscribe(
    //   x => {
    //     const setSegment = x.find(segment => segment.id == segmentId)
    //     this.segments.push(this.formLoadSegment(setSegment));
    //   }
    // )
  }

  onSelectedManufacturer(manufacturerId: number) {
    this.models$ = this.manufacturers$.pipe(
      map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
    )
   // this.formMain.get('manufacturerId').setValue(manufacturerId);
    // this.manufacturers$.subscribe(
    //   x => {
    //     const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
    //     this.manufacturers.push(this.formLoadManufacturer(manufacturer));
    //   }
    // )
  }

  onSelectedModel(modelId: number) {

    this.models$.subscribe(
      x => {
        const model = x.find(model => model.id == modelId);
       // this.formMain.get('modelId').setValue(modelId);
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
}














// import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { MatCheckboxChange } from "@angular/material/checkbox";
// import { Observable, of } from "rxjs";
// import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


// import { map } from "rxjs/operators";
// import { ProductDto } from "../../../dtos/product";
// import { SegmentDto } from "../../../dtos/segment-dto";
// import { ManufacturerDto } from "../../../dtos/manufacturer-dto";
// import { ModelDto } from "../../../dtos/model-dto";
// import { ProductTypeDto } from "../../../dtos/product-type-dto";

// export class EditProductTypeFormController extends BaseForm {
//   constructor(
//     private _fb: FormBuilder,

//   ) {
//     super()
//   }

//   //OBSERVABLES
//   products$ = new Observable<ProductTypeDto[]>();
//   segments$: Observable<SegmentDto[]>;
//   manufacturers$: Observable<ManufacturerDto[]>
//   models$: Observable<ModelDto[]>

//   //BOOLEANS
//   productformControlReset = false;


//   segmentFormControlReset = false;

//   manufacturerFormControlReset = false;


//   modelFormControlReset = false;

//   description = false;


//   //FORMS
//   get segments() {
//     return this.formMain.get('segments') as FormArray
//   }
//   get manufacturers() {
//     return this.segmentForm.get('manufacturers') as FormArray
//   }
//   get models() {
//     return this.manufacturerForm.get('models') as FormArray
//   }


//   segmentForm: FormGroup;
//   manufacturerForm: FormGroup;
//   modelForm: FormGroup;


//   formLoad() {
//     this.formMain = this._fb.group({
//       id: ['', []],
//       companyId: [this.companyId, [Validators.required]],
//       segmentId: ['', Validators.required],
//       manufacturerId: ['', Validators.required],
//       modelId: ['', Validators.required]
//     })
//   }

 

//   //SELECT
//   onSelectedProduct(productSelected: ProductTypeDto) {
//     this.segments$ = of(productSelected.segments);
//     //this.formMain.get('id').setValue(productSelected.id);
//   }

//   onSelectedSegment(segmentId: number) {
//     this.manufacturers$ = this.segments$.pipe(
//       map(x => x.find(segment => segment.id == segmentId).manufacturers)
//     )
//     // this.manufacturers$.subscribe(
//     //   x=> console.log(x)
//     // )
//   //  this.formMain.get('segmentId').setValue(segmentId);
//     // this.segments$.subscribe(
//     //   x => {
//     //     const setSegment = x.find(segment => segment.id == segmentId)
//     //     this.segments.push(this.formLoadSegment(setSegment));
//     //   }
//     // )
//   }

//   onSelectedManufacturer(manufacturerId: number) {
//     this.models$ = this.manufacturers$.pipe(
//       map(x => x.find(manufacturer => manufacturer.id == manufacturerId).models)
//     )
//    // this.formMain.get('manufacturerId').setValue(manufacturerId);
//     // this.manufacturers$.subscribe(
//     //   x => {
//     //     const manufacturer = x.find(manufacturer => manufacturer.id == manufacturerId)
//     //     this.manufacturers.push(this.formLoadManufacturer(manufacturer));
//     //   }
//     // )
//   }

//   onSelectedModel(modelId: number) {

//     this.models$.subscribe(
//       x => {
//         const model = x.find(model => model.id == modelId);
//        // this.formMain.get('modelId').setValue(modelId);
//       }
//     )
//   }

//   private formControlReset = (item: string, checked: boolean) => {
//     if (item == 'product') {
//       this.productformControlReset = checked;
//       this.segmentFormControlReset = checked;
//       this.manufacturerFormControlReset = checked;
//       this.modelFormControlReset = checked;
//     }

//     if (item == 'segment') {
//       this.segmentFormControlReset = checked;
//       this.manufacturerFormControlReset = checked;
//       this.modelFormControlReset = checked;
//     }

//     if (item == 'manufacturer') {
//       this.manufacturerFormControlReset = checked;
//       this.modelFormControlReset = checked;
//     }

//     if (item == 'model')
//       this.modelFormControlReset = checked;

//   }
// }
