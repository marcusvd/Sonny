import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';



import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ImportsFiledsInput } from '../useful/imports-fileds-input';


@Component({
  selector: 'manufacturer-input-field',
  standalone: true,
  imports: [ImportsFiledsInput],
  templateUrl: './manufacturer-input.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})
export class ManufacturerInputComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() override formMain: FormGroup;
  @Input() noEntriesFoundLabel = '';
  @Input() placeholderProductType = '';
  @Input() productTypeNameAttribute = '';


}
