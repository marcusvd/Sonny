import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";
import { map } from "rxjs/operators";


import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ex_makeDescription, ex_speed, ex_storage } from "../../common/helpers/product-type-helpers";


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

  //FormGroups
  segmentForm: FormGroup;
  manufacturerForm: FormGroup;
  modelForm: FormGroup;
  specificitiesForm: FormGroup;

  capacityHandle(value: string) {
    const handledValue = value.replace(/[^\d.-]/g, '');
    this.specificitiesForm.get('capacity').setValue(handledValue);
  }

  speedHandle(value: string) {
    const handledValue = value.replace(/[^\d.-]/g, '');
    this.specificitiesForm.get('speed').setValue(handledValue);
  }

  onSelectSpeedMeasure(id: number) {
    this.speed$.pipe(map(x => {
      const result = x.find(item => item.id === id)
      this.speedMeasure = this.specificitiesNone(result.name, 'speed');

    })).subscribe();
  }

  onSelectStorageMeasure(id: number) {
    this.storage$.pipe(map(x => {
      const result = x.find(item => item.id === id)

      this.storageMeasure = this.specificitiesNone(result.name, 'capacity');
    })).subscribe();

  }

  specificitiesNone = (value: string, item: string) => {
    if (value == 'Não especificado') {
      this.specificitiesForm.get(item).disable();
      this.specificitiesForm.get(item).reset();
      return null;
    }
    else
      this.specificitiesForm.get(item).enable();

    return value;
  }

  makeDescription = () => {
    ex_makeDescription(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm, this.speedMeasure, this.storageMeasure, '')
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
