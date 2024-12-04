import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerProductType } from './useful/form-controller-product-type';
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
export class AddProductTypeComponent extends FormControllerProductType implements OnInit {

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

   // this.products$ = this._productService.getAllIncluded$(this.companyId.toString());
  }

  noEntriesFoundLabel = 'Nenhum registro encontrado.';
  placeholderProduct = 'Pesquise pelo nome';
  productNameAttribute = 'pesquisa tipo de produto';

  formErrosValidation = false;
  saveBtnEnabledDisabled = false;


  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm);
    }
    else
      this.formErrosValidation = true;

  }

  // save() {

  //   if (this.alertSave(this.formMain)) {
  //     this.saveBtnEnabledDisabled = true;



  //     if (this.formMain.get('id').value != 0) {
  //       this._productService.update(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm);
  //       // const test = new MatCheckboxChange();
  //       // test.checked = true
  //       // this.productCheckbox(test);
  //       // test.checked = false
  //       // this.productCheckbox(test);

  //       //  this.productformControlReset = true;

  //       this.formControlReset('product', true);
  //       this.formControlReset('segment', true);
  //       this.formControlReset('manufacturer', true);
  //       this.formControlReset('model', true);

  //       this.clearAllFormArrays();
  //       this.addEmptyFormArrays();


  //     }
  //     else
  //       this._productService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm);


  //     //  this._productService.addOrUpdate(this.formMain);
  //   }
  //   else
  //     this.formErrosValidation = true;

  // }


}
