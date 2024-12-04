import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SegmentDto } from 'src/components/stock-product/product/dtos/segment-dto';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsProductType } from '../imports-fileds-product-type';


@Component({
  selector: 'segment-input-field',
  standalone: true,
  imports: [ImportsFiledsProductType],
  templateUrl: './segment.component.html',
  styles: [`

  mat-form-field {
      width: 100%;
  }
  `],
})
export class SegmentComponent extends BaseForm {


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
