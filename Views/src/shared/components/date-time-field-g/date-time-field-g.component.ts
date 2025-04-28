import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsDateTime } from './imports/imports-date-time';


@Component({
    selector: 'date-time-field-g',
    imports: [
        ImportsDateTime
    ],
    templateUrl: './date-time-field-g.component.html',
    styles: [`
  mat-form-field {
      width: 100%;
  }
  `]
})

export class DateTimeFieldGComponent extends BaseForm {

  constructor(
  ) {
    super()
  }

  @Input() fieldControlName = '';
  @Input() templateVariable =  'picker'
  @Input() labelInput = 'Data';
  @Input() startView = 'month';
  @Input() override formMain: FormGroup;

}
