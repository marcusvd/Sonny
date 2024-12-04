// import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { MatCheckboxChange } from "@angular/material/checkbox";
// import { Observable, of } from "rxjs";
// import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


// import { map } from "rxjs/operators";
// import { ManufacturerDto } from "../../dtos/manufacturer-dto";
// import { ModelDto } from "../../dtos/model-dto";
// import { ProductDto } from "../../dtos/product-dto";
// import { SegmentDto } from "../../dtos/segment-dto";

// export class FormController extends BaseForm {
//   constructor(
//     private _fb: FormBuilder,

//   ) {
//     super()
//   }

//   //OBSERVABLES
//   products$ = new Observable<ProductDto[]>();
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
//   onSelectedProduct(productSelected: ProductDto) {
//     this.segments$ = of(productSelected.segments);
//     this.formMain.get('id').setValue(productSelected.id);
//   }

//   onSelectedSegment(segmentId: number) {
//     this.manufacturers$ = this.segments$.pipe(
//       map(x => x.find(segment => segment.id == segmentId).manufacturers)
//     )
//     this.formMain.get('segmentId').setValue(segmentId);
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
//     this.formMain.get('manufacturerId').setValue(manufacturerId);
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
//         this.formMain.get('modelId').setValue(modelId);
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
