import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'subject-price-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FlexLayoutModule,
    CurrencyMaskModule,
  ],
  template: `
    <div fxLayout="column" [formGroup]="formMain">
    <div fxLayout="row" fxFlex [style]="stylePadding">
        <mat-form-field appearance="outline" fxFlex>
            <mat-label>Motivo</mat-label>
            <input matInput type="text" formControlName="subjectReason">
            <mat-error>
                <span>{{validatorMessages.required(formMain, 'subjectReason', 'Motivo')}}</span>
                <span>{{validatorMessages.minMaxLength(formMain,'subjectReason', 'Motivo',null,250)}}</span>
            </mat-error>
        </mat-form-field>
    </div>
    <div class="middle-space-horizontal-beteween-fields"></div>
    <div [fxLayout]="screenFieldPosition" fxFlex fxLayoutGap="10px" [style]="stylePadding">
        <div fxLayout="column" fxFlex>
            <mat-form-field fxFlex>
                <mat-label>Preço</mat-label>
                <input matInput currencyMask type="text" formControlName="price">
                <mat-error>
                    <span>{{validatorMessages.required(formMain,'price', 'Preço')}}</span>
                </mat-error>
            </mat-form-field>
        </div>
        <div fxLayout="column" fxFlex>
            <mat-form-field fxFlex>
                <mat-label>Contato no local</mat-label>
                <input matInput type="text" formControlName="contactName">
                <mat-error>
                    <span>{{validatorMessages.required(formMain, 'contactName', 'Responsável')}}</span>
                    <!-- <span>{{validatorMessages.minMaxOLength(formMain,'contactName', 'Responsável',null,45)}}</span> -->
                </mat-error>
            </mat-form-field>
        </div>
    </div>
    </div>
  `,
  styles: [`

  `],

})
export class SubjectPriceContactComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  screenFieldPosition: string = 'row';
  stylePadding: string = null;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            this.stylePadding ='margin-right:190px';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.stylePadding ='margin-right:190px';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.stylePadding = null;
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.stylePadding = null;
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.stylePadding = null;
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
   this.screen();
  }


}
