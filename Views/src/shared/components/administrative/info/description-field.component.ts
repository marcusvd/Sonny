import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'description-field',
  template: `
  <div [formGroup]="formMain">
        <div  >
            <mat-form-field appearance="outline">
                <mat-label>{{	label	}}</mat-label>
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
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

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

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {

  }

}
