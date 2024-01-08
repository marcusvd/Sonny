import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { CpfCnpjValidator } from 'src/shared/helpers/validators/cpf-cnpj.validator';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustomer } from '../../../../components/main/customer/validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../../../components/main/customer/validators/customer/validators-messages-customer';

@Component({
  selector: 'description-field',
  template: `
  <div [formGroup]="formMain">
   <div fxLayout="row">
        <div fxLayout="column" fxFlex>
            <mat-form-field appearance="outline">
                <mat-label>Observações</mat-label>
                <textarea matInput formControlName="description"></textarea>
                <mat-error>
                    <span>{{validatorMessages.minMaxLength(formMain,'description', 'Observações',null,150)}}</span>
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

  `]
})
export class DescriptionFieldComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;

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
