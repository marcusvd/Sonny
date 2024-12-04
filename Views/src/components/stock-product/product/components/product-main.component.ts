// import { Component, OnInit } from '@angular/core';


// import { FormGroup } from '@angular/forms';
// import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

// import { ImportsModulesComponents } from './imports-modules-components';
// // import { AddStockService } from '../services/add-stock.service';
// import { Router } from '@angular/router';
// import { MatCheckboxChange } from '@angular/material/checkbox';




// @Component({
//   selector: 'product-main',
//   standalone: true,
//   imports: [ImportsModulesComponents],
//   templateUrl: './product-main.component.html',
//   styles: [`
// .withoutProduct {
//   display: flex;
//   justify-content: center;
// }
//   `]
// })
// export class ProductMainAddComponent extends BaseForm implements OnInit {

//   constructor(
//     //public _fbMain: FormBuilder
//     // private _stockService: AddStockService,
//     private _route: Router,
//   ) {
//     super();
//   }

//   ngOnInit(): void {

//   }


//   add() {
//     this._route.navigateByUrl(`/side-nav/stock-product-router/add-product`)
//   }


//   save(product: FormGroup, productItem: FormGroup): void {

//     if (this.alertSave(product) && this.alertSave(productItem)){

//     }
//       // this._stockService.AddItemToStock(product, productItem);

//     // console.log(product.value)
//     // console.log(productItem.value)
//   }

 

// }
