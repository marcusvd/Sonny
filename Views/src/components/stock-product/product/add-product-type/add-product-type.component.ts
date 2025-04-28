import { Component, OnInit } from '@angular/core';


import { FormControllerAddProductType } from './helpers/form-controller-add-product-type';
import { FormsBuilderHelperAddProductTypeService } from './helpers/forms-builder-helper-add-product-type.service';
import { ImportsProductType } from './imports/imports-product-type';
import { ProductTypeService } from './services/product-type.service';


@Component({
    selector: 'product-add-update',
    imports: [ImportsProductType],
    templateUrl: './add-product-type.component.html',
    styleUrls: ['./add-product-type.component.scss'],
    providers: [ProductTypeService]
})
export class AddProductTypeComponent extends FormControllerAddProductType implements OnInit {

  constructor(
    private readonly _productTypeService: ProductTypeService,
    private readonly _formsBuilderHelperAddProductTypeService: FormsBuilderHelperAddProductTypeService
  ) {
    super()
  }

  ngOnInit(): void {
    this.formMain = this._formsBuilderHelperAddProductTypeService.formLoad(this.companyId, this.userId, null);
    this.addEmptyFormArrays();
  }

  save() {
    if (this.alertSave(this.formMain)) {
      // this.makeDescription();
      this.saveBtnEnabledDisabled = true;
      this._productTypeService.add(this.formMain, this.segmentForm, this.manufacturerForm, this.modelForm, this.specificitiesForm);
      this.formControlReset();
      this.formGroupsReset;
      this.variablesReset();
    }

  }

}
