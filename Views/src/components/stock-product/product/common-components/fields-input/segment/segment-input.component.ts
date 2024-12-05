import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SegmentDto } from 'src/components/stock-product/product/dtos/segment-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsInput } from '../useful/imports-fileds-input';


@Component({
  selector: 'segment-input-field',
  standalone: true,
  imports: [ImportsFiledsInput],
  templateUrl: './segment-input.component.html',
  styles: [`

  mat-form-field {
      width: 100%;
  }
  `],
})
export class SegmentInputComponent extends BaseForm {


  constructor(
  ) {
    super()
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input('segments') segments$: Observable<SegmentDto[]>;
  @Input() override formMain: FormGroup;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';

}
