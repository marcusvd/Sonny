import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { ValidatorsProductTypeEditAsyncField } from './form-validators/validators-product-type-edit-async-field';
import { FormControllerAddNewChildProductType } from './helpers/form-controller-add-new-child-product-type';
import { ImportsProductType } from './imports/imports-product-type';
import { UpdateProductTypeService } from './services/update-product-type.service';
import { ProductTypeEdit } from '../../dtos/produc-type-edit';
import { ex_formLoad, ex_formLoadManufacturer, ex_formLoadModel, ex_formLoadSegment } from './helpers/forms-export-helpers';


@Component({
  selector: 'new-item-product-type',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './add-new-child-product-type.component.html',
  styleUrls: ['./add-new-child-product-type.component.scss'],
  providers: []
})
export class AddNewChildProductTypeComponent extends FormControllerAddNewChildProductType implements OnInit {

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
    }
  }

  //properties
  productTypeEdit: ProductTypeEdit = new ProductTypeEdit();
  formErrosValidation = false;

  addEmptyFormArrays() {
    this.segments.push(ex_formLoadSegment(this.companyId, this.productTypeEdit));
    this.manufacturers.push(ex_formLoadManufacturer(this.companyId, this.productTypeEdit));
    this.models.push(ex_formLoadModel(this.companyId, this.productTypeEdit));
  }




  ngOnInit(): void {
    ex_formLoad(this.companyId, this.userId, this.productTypeEdit);
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

  save() {

    if (this.alertSave(this.formMain)) {
      this.setFormFieldEnableDisable(this.specificitiesForm, 'description', true);
      this.formEnableToSave();
      this.saveBtnEnabledDisabled = true;
      this.makeDescription();
      this._productTypeService.updateSingle(this.formMain);
      this.formControlReset();
    }
    else
      this.formErrosValidation = true;
  }


}
