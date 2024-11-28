import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { ProductGetService } from '../../services/product-get.service';
import { FormController } from './form-controller';
import { ImportsModulesComponents } from './imports-modules-components';



@Component({
  selector: 'add-update-product',
  standalone: true,
  imports: [ImportsModulesComponents],
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css'],
  providers: [ProductGetService]
})
export class AddUpdateProductComponent extends FormController implements OnInit {

  constructor(
    public _fbMain: FormBuilder,
    private _productService: ProductGetService,
  ) {
    super(_fbMain)
  }

  ngOnInit(): void {
    this.formLoad();
    this.addEmptyFormArrays();

    this.products$ = this._productService.getAll(this.companyId.toString());

  }


  noEntriesFoundLabel = 'Nenhum registro encontrado.';
  placeholderProductType = 'Pesquise pelo nome';
  productTypeNameAttribute = 'pesquisa tipo de produto';

  formErrosValidation = false;
  saveBtnEnabledDisabled = false;


  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productService.save(this.formMain, this.productInput);
    }
    else
      this.formErrosValidation = true;

  }


}
