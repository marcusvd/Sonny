import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportsModulesComponents } from './imports-modules-components';




@Component({
  selector: 'product-main',
  standalone: true,
  imports: [ImportsModulesComponents],
  template: `
<div class="border-around">
<title-component [digit]="'|'" [titleString]="'Tipo de produto'" [icon]="'attach_money'">
    </title-component>

    <mat-card class="small-large-screen">
      
    <sub-title title [title]="'Cadastro'" [icon]="'add'"></sub-title>
        
        <product-add-update #product>
        </product-add-update>
  
  <add-item-product #productItem [hidden]="!product?.formMain?.valid">
  </add-item-product>

        <!-- [enableDisable]="saveBtnEnabledDisabled" -->
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="50px">
            <btn-g [name]="'Salvar'" [icon]="'save'" (btn)="save(product.formMain, productItem.formMain)"></btn-g>
        </div>
  </mat-card>
</div>
   

  `,
  styles: [`
  
  `]
})
export class ProductMainAddComponent implements OnInit {


  // constructor(public _fbMain: FormBuilder) {

  // }

  ngOnInit(): void {

  }

  save(product: FormGroup, productItem: FormGroup): void {
    console.log(product.value)
    console.log(productItem.value)
  }
  // isUsed = false;
  // onChangeIsUsed(selection: MatCheckboxChange) {
  //   this.isUsed = selection.checked;
  // }

}
