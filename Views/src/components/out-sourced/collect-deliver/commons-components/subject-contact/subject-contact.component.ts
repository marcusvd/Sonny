import { Component, Input } from '@angular/core';


import { FormGroup } from '@angular/forms';
import { AddDefaultImports } from '../../../../../components/imports/components-default.imports';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';

@Component({
  selector: 'subject-contact',
  standalone: true,
  imports: [
    AddDefaultImports
  ],
  templateUrl: './subject-contact.component.html',
  styles: [``],

})
export class SubjectContactComponent extends BaseForm {
  @Input() override formMain: FormGroup;
  constructor() { super() }
}
