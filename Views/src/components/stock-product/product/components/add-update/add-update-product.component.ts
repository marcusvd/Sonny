import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { ProductGetService } from '../../services/product-get.service';
import { ImportsModulesComponents } from './imports-modules-components';
import { FormController } from './form-controller';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { BreakpointObserver } from '@angular/cdk/layout';



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
    // this.screen();
  }

  noEntriesFoundLabel = 'Nenhum registro encontrado.';
  placeholderProductType = 'Pesquise pelo nome';
  productTypeNameAttribute = 'pesquisa tipo de produto';

  formErrosValidation = false;
  saveBtnEnabledDisabled  = false;

// screenClass = false;
//   screen(test?:any) {
//     console.log(test)
//     this.screenSize().subscribe({
//       next: (result: IScreen) => {
//         switch (result.size) {
//           case 'xsmall': {
//            this.screenClass = true;
           
//            break;
//           }
//           case 'small': {
//             this.screenClass = true;
//             break;
//           }
//           case 'medium': {
//             this.screenClass = false;
//             break;
//           }
//           case 'large': {
//             this.screenClass = false;
            
//             break;
//           }
//           case 'xlarge': {
//             this.screenClass = false;
//             break;
//           }
//         }
//       }
//     })
//   }

  save() {

    if (this.alertSave(this.formMain)) {
      this.saveBtnEnabledDisabled = true;
      this._productService.save(this.formMain, this.product);
    }
    else
      this.formErrosValidation = true;

  }


}
