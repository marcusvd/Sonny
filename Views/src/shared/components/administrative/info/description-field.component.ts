import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'description-field',
  template: `
  <div [formGroup]="formMain">
   <div fxLayout="row">
        <div fxLayout="column" fxFlex>
            <mat-form-field appearance="outline">
                <mat-label>Observações</mat-label>
                <textarea matInput [formControlName]="description" [rows]="rows"></textarea>
                <mat-error>
                    <span>{{validatorMessages.minMaxLength(formMain,description, 'Observações', minLength, maxLength)}}</span>
                    <span *ngIf="required">{{validatorMessages.required(formMain, description, 'Descrição')}}</span>
                </mat-error>

            </mat-form-field>
        </div>
    </div>
</div>
  `,
  styles: [`
  .middle-space-horizontal-beteween-fields {
    padding-top: 20px;
}

  `],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FlexLayoutModule,
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
  @Input() description: string = 'description';
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
