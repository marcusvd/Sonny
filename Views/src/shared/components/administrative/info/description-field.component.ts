
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'description-field',
  template: `
  <div [formGroup]="formMain">
        <div>
          <div>
             <mat-label>{{	label	}}</mat-label>
          </div>
            <mat-form-field class="w-full" appearance="outline">
                <textarea matInput [formControlName]="frmControlName" [rows]="rows" [placeholder]="label"></textarea>
                <mat-error>
                    <span>{{validatorMessages.minMaxLength(formMain,frmControlName, 'Observações', minLength, maxLength)}}</span>
                    <span *ngIf="required">{{validatorMessages.required(formMain, frmControlName, 'Descrição')}}</span>
                </mat-error>
            </mat-form-field>
        </div>
</div>
  `,
  styles: [`

  `],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class DescriptionFieldComponent extends BaseForm implements OnInit {

  constructor(

  ) { super() }

  @Input() override formMain: FormGroup;
  @Input() rows: number;
  @Input() maxLength: number = 1000;
  @Input() minLength: number = null;
  @Input() frmControlName: string = 'description';
  @Input() label: string = 'Observações';
  @Input() required: boolean = false;


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  ngOnInit(): void {

  }

}
