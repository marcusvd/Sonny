import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


import { ProductTypeDto } from 'src/components/stock-product/product/dtos/product-type-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsFiledsInput } from '../useful/imports-fileds-input';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'field-input-g',
  standalone: true,
  imports: [ImportsFiledsInput],
  templateUrl: './field-input-g.component.html',
  styles: [`
    mat-form-field{
      width:100%;
    }
    
    `],

})
export class FieldInputGComponent extends BaseForm {

  constructor() {
    super()
  }

  @Input() fieldControlName = 'name';
  @Input() inputLabel = '';
  @Input() type = 'text';
  @Input() min:number = 0;
  @Input() max: number = null;
  @Input() override formMain: FormGroup;
  @Input() currency: boolean = false;
  @Input() placeHolder:string = null;

  // get inUse() {
  //   return this.formMain.get('name')?.hasError('inUse')
  // }
  // get required() {
  //   return this.formMain.get('name')?.hasError('required')
  // }

  // get maxlength() {
  //   return this.formMain.get('name')?.hasError('maxlength')
  // }

  // hasError = (form: FormGroup, field: string, error: string) => {
  //   return form.get(field)?.hasError(error)
  // }

}
