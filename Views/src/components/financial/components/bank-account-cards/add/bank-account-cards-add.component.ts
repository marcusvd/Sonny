import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';


import { BreakpointObserver } from '@angular/cdk/layout';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BankAccountComponent } from '../../common-components/bank-account/bank-account.component';
import { BankCardsComponent } from '../../common-components/bank-cards/bank-cards.component';
import { BankAccountAddService } from './services/bank-account-add.service';


@Component({
  selector: 'bank-account-cards-add',
  templateUrl: './bank-account-cards-add.component.html',
  styleUrls: ['./bank-account-cards-add.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    BankAccountComponent,
    BankCardsComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    PixComponent
  ],
  providers:[
    BankAccountAddService
  ]
})
export class BankAccountCardsAddComponent extends Add implements OnInit {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';

  constructor(
    protected _bankAccountService: BankAccountAddService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  get getDate(): Date {
    return new Date()
  }

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      holder: ['', [Validators.required, Validators.maxLength(100)]],
      institution: ['', [Validators.required, Validators.maxLength(100)]],
      agency: ['', [Validators.required, Validators.maxLength(20)]],
      managerName: ['', [Validators.maxLength(50)]],
      managerContact: ['', [Validators.maxLength(100)]],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['CORRENTE', [Validators.required]],
      balance: ['', [Validators.required]],
      description: ['', [Validators.maxLength(100)]],
      pixes: this._fb.array([]),
      cards: this._fb.array([]),
    })
  }

  save() {
    console.log(this.formMain.controls)
    if (this.alertSave(this.formMain)) {
      this._bankAccountService.save(this.formMain);

    }
  }

  ngOnInit(): void {
    this.screen();
    this.formLoad();
  }

}
