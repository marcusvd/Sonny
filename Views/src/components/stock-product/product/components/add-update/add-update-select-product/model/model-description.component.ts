import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'model-description',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `
  <mat-form-field class="default-field-width" *ngIf="hideShow" appearance="outline" [formGroup]="formMain">
        <mat-label>Descrição</mat-label>
        <input type="text" matInput [placeholder]="placeholderProductType" formControlName="description">
        <mat-error>
            <span>{{validatorMessages.required(formMain, 'name', 'Descrição')}}</span>
        </mat-error>
  </mat-form-field>
  `,
  styles: [`
      mat-form-field {
      width: 100%;
  }
  `],
})
export class ModelDescriptionComponent extends BaseForm {

  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  @Input() hideShow: boolean = null;
  @Input() override formMain: FormGroup;

  @Input() placeholderProductType = '';

}
