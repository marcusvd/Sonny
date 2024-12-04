// import { Component, OnInit } from '@angular/core';
// import { FormBuilder } from '@angular/forms';


// // import { ProductGetService } from '../../services/product-get.service';
// import { FormController } from './form-controller';
// import { MatCheckboxChange } from '@angular/material/checkbox';
// import { ImportsModulesComponentsStockItem } from './imports-modules-stock-item.components';



// @Component({
//   selector: 'add-stock-item',
//   standalone: true,
//   imports: [ImportsModulesComponentsStockItem],
//   templateUrl: './add-stock-item.component.html',
//   styleUrls: ['./add-stock-item.component.css'],
//   // providers: [ProductGetService]
// })
// export class AddStockItemComponent extends FormController implements OnInit {

//   constructor(
//     public _fbMain: FormBuilder,
//     // private _productService: ProductGetService,
//   ) {
//     super(_fbMain)
//   }

//   ngOnInit(): void {
//     this.formLoad();
//     // this.addEmptyFormArrays();

//     // this.products$ = this._productService.getAll(this.companyId.toString());

//   }

//   noEntriesFoundLabel = 'Nenhum registro encontrado.';
//   placeholderProduct = 'Pesquise pelo nome';
//   productNameAttribute = 'pesquisa tipo de produto';

//   formErrosValidation = false;
//   saveBtnEnabledDisabled = false;


  // save() {

  //   if (this.alertSave(this.formMain)) {
  //     this.saveBtnEnabledDisabled = true;



  //     if (this.formMain.get('id').value != 0) {
  //       this._productService.update(this.formMain);
  //       const test = new MatCheckboxChange();
  //       test.checked = true
  //       this.productCheckbox(test);
  //       test.checked = false
  //       this.productCheckbox(test);
        
  //        this.productformControlReset = true;
  //       // this.segmentFormControlReset = true;
  //       // this.manufacturerFormControlReset = true;
  //       // this.modelFormControlReset = true;
  //       // this.productInput = true;
  //       // this.productInput = false;


  //     }
  //     else
  //       this._productService.addNew(this.formMain);


  //     //  this._productService.addOrUpdate(this.formMain);
  //   }
  //   else
  //     this.formErrosValidation = true;

  // }


// }
