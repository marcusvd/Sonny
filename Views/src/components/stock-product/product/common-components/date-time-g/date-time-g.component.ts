import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsDateTime } from './useful/imports-date-time';


@Component({
  selector: 'date-time-g',
  standalone: true,
  imports: [
    ImportsDateTime
  ],
  templateUrl: './date-time-g.component.html',
  styles: [`
  mat-form-field {
      width: 100%;
  }
  `],
})

export class DateTimeGComponent extends BaseForm {

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
