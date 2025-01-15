import { FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";


import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ex_makeDescription, ex_measurersHandle, ex_onSelectSpeedMeasure, ex_speed, ex_storage } from "../../common/helpers/product-type-helpers";

export class FormControllerAddProductType extends BaseForm {
  constructor(
  ) {
    super()
  }

  //FormControls
  speedFormControl = new FormControl(null, Validators.required);
  speedSearchFormControl = new FormControl('', Validators.required);
  capacityFormControl = new FormControl(null, Validators.required);
  capacitySearchFormControl = new FormControl('', Validators.required);

  //Arrays
  speed$ = of(ex_speed);
  storage$ = of(ex_storage);

  //variables
  speedMeasure = ''
  storageMeasure = ''

  storageHandledValue: string = '';
  speedHandledValue: string = '';
  
  //FormGroups
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificitiesForm: FormGroup;
 
  capacityHandle(value: string) {
    this.storageHandledValue = ex_measurersHandle(this.specificitiesForm, 'capacity', value, this.storageMeasure);
  }
  
  speedHandle(value: string) {
    this.speedHandledValue = ex_measurersHandle(this.specificitiesForm, 'speed', value, this.speedMeasure);
  }

  onSelectSpeedMeasure(id: number) {
    this.speedMeasure = ex_onSelectSpeedMeasure(id, this.specificitiesForm, this.speed$, 'speed', this.speedHandledValue);
  }

  onSelectStorageMeasure(id: number) {
    this.storageMeasure = ex_onSelectSpeedMeasure(id, this.specificitiesForm, this.storage$, 'capacity', this.storageHandledValue);
  }

  makeDescription = () => {
    ex_makeDescription(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm, '')
  }

  addEmptyFormArrays() {
    this.segmentForm = this.formMain.get('segments').get('0') as FormGroup;
    this.manufacturerForm = this.formMain.get('segments').get('0').get('manufacturers').get('0') as FormGroup;
    this.modelForm = this.formMain.get('segments').get('0').get('manufacturers').get('0').get('models').get('0') as FormGroup;
    this.specificitiesForm = this.modelForm.get('specificities') as FormGroup;
  }


  formControlReset = () => {
    this.speedFormControl.reset();
    this.speedSearchFormControl.reset();
    this.capacityFormControl.reset();
    this.capacitySearchFormControl.reset();
  }


}
