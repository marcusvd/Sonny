import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
// import { ProductGetService } from 'src/components/stock-product/product/services/product-get.service';

import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'add-update-product-input',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,

  ],
  templateUrl: './add-update-product-input.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
  // providers: [ProductGetService],
})
export class AddUpdateProductInputComponent extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;


  @Input() placeholderProductType = 'Pesquise pelo nome';
  @Input() productTypeNameAttribute = 'pesquisa tipo de produto';

}
