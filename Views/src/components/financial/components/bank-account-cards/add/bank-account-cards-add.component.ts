import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { Add } from 'src/shared/components/inheritance/add/add';

import { MatDividerModule } from '@angular/material/divider';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

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
    MatDividerModule,
    BankAccountComponent,
    BankCardsComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    PixComponent
  ],
  providers: [
    BankAccountAddService
  ]
})
export class BankAccountCardsAddComponent extends Add implements OnInit {

  institutionName: string;

  constructor(
    protected _bankAccountService: BankAccountAddService,
    private _fb: FormBuilder,
    private cdRef: ChangeDetectorRef


  ) { super() }

  

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  onInstitution(institutionName: string) {
    this.institutionName = institutionName;
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

    this.formLoad();
  }

}
