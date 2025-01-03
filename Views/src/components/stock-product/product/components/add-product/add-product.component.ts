import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AddProductService } from '../../services/add-product.service';
import { ProductTypeService } from '../../services/product-type.service';
import { FormControllerAddProduct } from './useful/form-controller-add-product';
import { ImportsAddProduct } from './useful/imports-add-product';


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
    private _router: Router
  ) {
    super(_fbMain)
  }

  ngOnInit(): void {
    this.productsTypes$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
    this.formMainLoad();
  }

  formMainLoad = () => {
    this.formMain = this.formLoad(this.formMain, this.companyId, this.userId, null);
  }


  callRouter = (call?: string) => {
    if (call === 'add')
      this._router.navigate(['/side-nav/stock-product-router/add-product-type']);
    else
      this._router.navigate(['/side-nav/stock-product-router/edit-product-type']);
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
