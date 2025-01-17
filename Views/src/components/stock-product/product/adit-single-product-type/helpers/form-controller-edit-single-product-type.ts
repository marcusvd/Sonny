import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";


import { BaseForm } from "src/shared/components/inheritance/forms/base-form";
import { ex_makeDescription, ex_measurersHandle, ex_onSelectSpeedMeasure, ex_speed, ex_storage } from "../../common/helpers/product-type-helpers";
import { ProductTypeDto } from "../../dtos/product-type-dto";

export class FormControllerEditSingleProductType extends BaseForm {
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
  productTypeToEdit: ProductTypeDto = new ProductTypeDto();

  get segments() {
    return this.formMain.get('segments').get('0') as FormGroup;
  }
  get manufacturers() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0') as FormGroup;
  }
  get models() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0').get('models').get('0') as FormGroup;
  }
  get specificity() {
    return this.formMain.get('segments').get('0').get('manufacturers').get('0').get('models').get('0').get('specificities') as FormGroup;
  }

  capacityHandle(value: string) {
    this.storageHandledValue = ex_measurersHandle(this.specificity, 'capacity', value, this.storageMeasure);
  }

  speedHandle(value: string) {
    this.speedHandledValue = ex_measurersHandle(this.specificity, 'speed', value, this.speedMeasure);
  }

  onSelectSpeedMeasure(id: number) {
    this.speedMeasure = ex_onSelectSpeedMeasure(id, this.specificity, this.speed$, 'speed', this.speedHandledValue);
  }

  onSelectStorageMeasure(id: number) {
    this.storageMeasure = ex_onSelectSpeedMeasure(id, this.specificity, this.storage$, 'capacity', this.storageHandledValue);
  }

  makeDescription = () => {
    ex_makeDescription(this.formMain, this.segments, this.manufacturers, this.models, this.specificity, '')
  }


  loadMeasurers = (form: FormGroup, measurers: Observable<any[]>, productType: any, entitiy: string, formControl: FormControl) => {
    measurers.subscribe(
      x => {
        const measure = productType?.segments[0]?.manufacturers[0]?.models[0]?.specificities[entitiy]?.toLowerCase()?.replace(/[\s\d]/g, '');
        const foundMeasure = x?.find(y => y?.name?.toLowerCase() == measure);

        if (foundMeasure == null || foundMeasure == undefined) {
          this.setFormFieldEnableDisable(form, entitiy, false)
          formControl?.setValue(x?.find(y => y?.id == 0)?.id)
        }
        else
          formControl?.setValue(x?.find(y => y?.name?.toLowerCase() == foundMeasure.name.toLowerCase())?.id)
      }
    )
  }

  formControlReset = () => {
    this.speedFormControl.reset();
    this.speedSearchFormControl.reset();
    this.capacityFormControl.reset();
    this.capacitySearchFormControl.reset();
  }


}
