import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelDto } from 'src/components/stock-product/product/dtos/model-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsProductType } from '../imports-fileds-product-type';



@Component({
  selector: 'model-input-field',
  standalone: true,
  imports: [ImportsFiledsProductType],
  templateUrl: './model.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }

  `],
})
export class ModelComponent extends BaseForm {


  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

  @Input() override formMain: FormGroup;

}
