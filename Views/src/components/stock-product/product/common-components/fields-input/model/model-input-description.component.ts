import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';


@Component({
  selector: 'model-description-input-field',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  template: `

  <div [formGroup]="formMain" class="container">
    
        <mat-form-field appearance="outline">
            <mat-label>Velocidade</mat-label>
            <input type="text" matInput [placeholder]="placeholderProductType" formControlName="speed">
            <mat-error>
                <span>{{validatorMessages.required(formMain, 'name', 'Fabricante')}}</span>
            </mat-error>
        </mat-form-field>
   
    
        <mat-form-field appearance="outline">
            <mat-label>Capacidade</mat-label>
            <input type="text" matInput [placeholder]="placeholderProductType" formControlName="capacity">
            <mat-error>
                <span>{{validatorMessages.required(formMain, 'name', 'Fabricante')}}</span>
            </mat-error>
        </mat-form-field>
</div>

<mat-form-field class="default-field-width" appearance="outline" [formGroup]="formMain">
        <mat-label>Descrição</mat-label>
        <input type="text" matInput [placeholder]="placeholderProductType" formControlName="description">
        <mat-error>
            <span>{{validatorMessages.required(formMain, 'name', 'Descrição')}}</span>
        </mat-error>
  </mat-form-field>
  `,
  styles: [`
    
   @media(min-width:640px){
    .container{
         display: flex;
        gap: 10px;
        width: 100%;
      }
   }

    mat-form-field {
      width: 100%;
  }
  `],
})
export class ModelInputDescriptionComponent extends BaseForm {

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

  @Input() placeholderProductType = '';

}
