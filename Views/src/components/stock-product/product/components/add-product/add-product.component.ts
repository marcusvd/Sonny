import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AddProductService } from '../../services/add-product.service';
import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProduct } from './useful/form-controller-add-product';
import { ImportsAddProduct } from './useful/imports-add-product';
import { EditChildrenProductType } from './dto/produc-type-edit';


@Component({
  selector: 'add-product',
  standalone: true,
  imports: [ImportsAddProduct],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent extends FormControllerAddProduct implements OnInit {
  constructor(
    public _fbMain: FormBuilder,
    private _productTypeService: ProductTypeService,
    private _addProductService: AddProductService,
    private _routerMain: Router
  ) {
    super(_fbMain,_routerMain)
    if (this._routerMain.getCurrentNavigation().extras.state) {
      const obj = this._routerMain.getCurrentNavigation().extras.state;

      this.editChildrenProductType = obj as EditChildrenProductType;
    }
  }

  ngOnInit(): void {
    this.productsTypes$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
    this.formMainLoad();
  }

  formMainLoad = () => {
    this.formMain = this.formLoad(this.formMain, this.companyId, this.userId, null);
  }

  onChangeIsUsed(selection: MatCheckboxChange) {
    if (selection.checked)
      this.formMain.get('usedHistoricalOrSupplier').enable();
    else
      this.formMain.get('usedHistoricalOrSupplier').disable();
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._addProductService.add(this.formMain);
      this.formControlReset();

      this.formMainLoad();
     
    }

  }
}