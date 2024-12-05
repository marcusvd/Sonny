import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


import { ProductTypeDto } from 'src/components/stock-product/product/dtos/product-type-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsFiledsInput } from '../useful/imports-fileds-input';


@Component({
  selector: 'product-input-field',
  standalone: true,
  imports: [ImportsFiledsInput],
  templateUrl: './product-input.component.html',
  styles: [`

    mat-form-field {
      width: 100%;
  }
  `],

})
export class ProductInputComponent extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  get inUse(){
    return this.formMain.get('name')?.hasError('inUse')
  }
  get required(){
    return this.formMain.get('name')?.hasError('required')
  }

  @Input('products') products$ = new Observable<ProductTypeDto[]>();
  @Input() noEntriesFoundLabel = 'Nenhum registro encontrado.';
  @Input() placeHolderProduct = 'Pesquise pelo nome';
  @Input() productNameAttribute = 'pesquisa tipo de produto';
  @Input() override formMain: FormGroup;
}
