import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'subject-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIf,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    CurrencyMaskModule,
    MatDatepickerModule,
  ],
  templateUrl: './subject-contact.component.html',
  styles: [`

  `],

})
export class SubjectContactComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;
  transportOptions: string[] = ['Combustível', 'Aplicativo', 'MotoBoy', 'Transporte publico'];
  methodTransport:string = 'Combustível';
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
            this.stylePadding = 'margin-right:190px';

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.stylePadding = 'margin-right:190px';
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
  onPriceSelected(typeTransporte: string) {
    const selected = typeTransporte;

    // if (selected === 'Combustível')
    //   this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.fuel || this?.selectedPartnerPayment?.physicallyMovingCosts?.fuel);


  }
  ngOnInit(): void {
    this.screen();
  }


}
