import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProductType } from './useful/form-controller-add-product-type';
import { ImportsProductType } from './useful/imports-product-type';
import { ProductTypeValidatorAsync } from './useful/product-type-validator-async-fields';



@Component({
  selector: 'product-add-update',
  standalone: true,
  imports: [ImportsProductType],
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css'],
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



  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm);
    }
    else
      this.formErrosValidation = true;

  }


}
