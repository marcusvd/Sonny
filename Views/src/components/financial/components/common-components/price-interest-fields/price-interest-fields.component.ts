
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'price-interest-fields',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  templateUrl:'./price-interest-fields.component.html',
  styles: [`
`]
})

export class PriceInteresFieldsComponent extends BaseForm{

  

  @Input() override formMain: FormGroup;
  @Input() interestHideShow: boolean = true;
  @Input() priceHideShow: boolean = true;
  @Input() priceFormControlName: string = 'price';
  @Input() interestFormControlName: string = 'interest'

  constructor() {super();}

}
