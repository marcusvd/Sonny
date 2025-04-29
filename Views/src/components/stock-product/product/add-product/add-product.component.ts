import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange as MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ControllerAddProduct } from './helpers/controller-add-product';
import { ImportsAddProduct } from './imports/imports-add-product';
import { ProductTypeAfterEditHandled } from '../dtos/product-type-after-edit-handled';
import { ex_formLoad } from './helpers/form-main-export-helpers';
import { AddProductService } from './services/add-product.service';

@Component({
  selector: 'add-product',
  standalone: true,
  imports: [ImportsAddProduct],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent extends ControllerAddProduct implements OnInit {
  constructor(
    public _fbMain: FormBuilder,
    private _addProductService: AddProductService,
    private _routerMain: Router
  ) {
    super(_fbMain, _routerMain)
    if (this._routerMain.getCurrentNavigation().extras.state) {
      const obj = this._routerMain.getCurrentNavigation().extras.state;

      this.productTypeAfterEditHandled = new ProductTypeAfterEditHandled();

      this.productTypeAfterEditHandled = obj as ProductTypeAfterEditHandled;
      this.selectedEntitiesAfterEdit();
    }
  }


  ngOnInit(): void {
    this.productsTypes$ = this._addProductService.getAllIncluded$(this.companyId.toString());
    this.formMainLoad();
    if (this?.productTypeAfterEditHandled) {
      this.onSelectedProduct(this?.productTypeAfterEditHandled?.productTypesId)
      this.onSelectedSegment(this?.productTypeAfterEditHandled?.segmentId)
      this.onSelectedManufacturer(this?.productTypeAfterEditHandled?.manufacturerId)
      this.onSelectedModel(this?.productTypeAfterEditHandled?.modelId)
      this.formMain.get('specificitiesId').patchValue(this?.productTypeAfterEditHandled?.specificitiesId);
    }

  }

  formMainLoad = () => {
    this.formMain = ex_formLoad(this.formMain, this.companyId, this.userId, null);
  }

  onChangeIsUsed(selection: MatCheckboxChange) {
    if (selection.checked)
      this.formMain.get('usedHistoricalOrSupplier').enable();
    else
      this.formMain.get('usedHistoricalOrSupplier').disable();
  }

   isBtnEditDisabled = () => {
    
   return  this.formMain.get('specificitiesId').value == '' || this.formMain.get('specificitiesId').value < 1

  }

  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._addProductService.add(this.formMain);
      this.formControlReset();
      this.setFormFieldEnableDisable(this.specificitiesForm, 'description', true);
      this.formMainLoad();
      this.productTypeAfterEditHandled = null;
    }

  }
}