import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { map } from 'rxjs/operators';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductTypeValidatorAsync } from './form-validators/product-type-validator-async-fields';
import { FormControllerAddProductType } from './helpers/form-controller-add-product-type';
import { ImportsProductType } from './imports/imports-product-type';


@Component({
  selector: 'product-add-update',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.scss'],
  providers: [ProductTypeService]
})
export class AddProductTypeComponent extends FormControllerAddProductType implements OnInit {

  constructor(
    public _fbMain: FormBuilder,
    public _productTypeService: ProductTypeService,
    override _productTypeValidatorAsync: ProductTypeValidatorAsync,
  ) {
    super(_fbMain, _productTypeValidatorAsync)
  }

  ngOnInit(): void {
    this.formLoad();
    this.addEmptyFormArrays();
  }

  noEntriesFoundLabel = '';
  placeholderProduct = '';
  productNameAttribute = '';

  formErrosValidation = false;

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


  handleFormToSave = () => {
    const speed = this.specificitiesForm.get('speed');
    const capacity = this.specificitiesForm.get('capacity');
    speed.setValue(speed.value + '|' + this.speedMeasure);
    capacity.setValue(capacity.value + '|' + this.storageMeasure);
  }

  save() {
    if (this.alertSave(this.formMain)) {
      this.setFormFieldEnableDisable(this.specificitiesForm, 'description', true);
      this.handleFormToSave();
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm);
      this.formControlReset();

    }
    else
      this.formErrosValidation = true;

  }

}
