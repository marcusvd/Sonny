import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ImportsFiledsInput } from './imports/imports-input-field-g';


@Component({
  selector: 'input-field-g',
  standalone: true,
  imports: [ImportsFiledsInput],
  templateUrl: './input-field-g.component.html',
  styles: [`
    mat-form-field{
      width:100%;
    }

    `],

})
export class InputFieldGComponent extends BaseForm {

  constructor() {
    super()
  }

  @Input() fieldControlName = 'name';
  @Input() inputLabel = '';
  @Input() type = 'text';
  @Input() min: number = 0;
  @Input() max: number = null;
  @Input() override formMain: FormGroup;
  @Input() currency: boolean = false;
  @Input() placeHolder: string = null;
  @Output() outInput = new EventEmitter<InputEvent>();

  onInput = (event: InputEvent) => {
    this.outInput.emit(event);
  }
}
