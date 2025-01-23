import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { ValidatorsProductTypeEditAsyncField } from './form-validators/validators-product-type-edit-async-field';
import { FormControllerAddNewChildProductType } from './helpers/form-controller-add-new-child-product-type';
import { ImportsProductType } from './imports/imports-product-type';
import { UpdateProductTypeService } from './services/update-product-type.service';
import { ProductTypeEdit } from '../dtos/produc-type-edit';
import { FormsBuilderHelperAddNewChildProductTypeService } from './helpers/forms-builder-helper-add-new-child-product-type.service';


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
    private _router: Router,
    private readonly _formsBuilderHelperAddNewChildProductTypeService: FormsBuilderHelperAddNewChildProductTypeService
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

  ngOnInit(): void {
    this.formMain = this._formsBuilderHelperAddNewChildProductTypeService.formLoad(this.companyId, this.userId, this.productTypeEdit);
    this.addEmptyFormArrays();
    this.formDisabledToStart();
  }

  
  save() {

    if (this.alertSave(this.formMain)) {
      this.setFormFieldEnableDisable(this.specificitiesForm, 'description', true);
      this.formEnableToSave();
      this.saveBtnEnabledDisabled = true;
      // this.makeDescription();
      this._productTypeService.updateSingle(this.formMain);
      this.formControlReset();
    }
    else
      this.formErrosValidation = true;
  }


}
