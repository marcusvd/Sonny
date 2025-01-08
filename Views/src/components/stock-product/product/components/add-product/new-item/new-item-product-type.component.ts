import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { ProductTypeEdit } from '../dto/produc-type-edit';
import { ValidatorsProductTypeEditAsyncField } from './form-validators/validators-product-type-edit-async-field';
import { FormControllerAddProductType } from './helpers/form-controller-add-product-type';
import { ImportsProductType } from './imports/imports-product-type';
import { UpdateProductTypeService } from './services/update-product-type.service';

@Component({
  selector: 'new-item-product-type',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './new-item-product-type.component.html',
  styleUrls: ['./new-item-product-type.component.scss'],
  providers: []
})
export class NewItemProductTypeComponent extends FormControllerAddProductType implements OnInit {

  constructor(
    public _fbMain: FormBuilder,
    public _productTypeService: UpdateProductTypeService,
    override _validatorsAsyncField: ValidatorsProductTypeEditAsyncField,
    private _router: Router
  ) {
    super(_fbMain, _validatorsAsyncField)

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;

      this.productTypeEdit = (obj as ProductTypeEdit);
      console.log(this.productTypeEdit)
    }
  }

  //properties
  productTypeEdit: ProductTypeEdit = new ProductTypeEdit();
  formErrosValidation = false;

  addEmptyFormArrays() {
    this.segments.push(this.formLoadSegment(this.productTypeEdit))
    this.manufacturers.push(this.formLoadManufacturer(this.productTypeEdit))
    this.models.push(this.formLoadModel(this.productTypeEdit))
    this.specificities.push(this.formLoadSpecificities())
  }

  ngOnInit(): void {
    this.formLoad(this.productTypeEdit);

    this.addEmptyFormArrays();

    this.formDisabledToStart();
  }

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
      this.formEnableToSave();
      this.handleFormToSave();
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.updateSingle(this.formMain);
      this.formControlReset();
    }
    else
      this.formErrosValidation = true;
  }


}
