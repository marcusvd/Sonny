import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { Add } from '../../../../../shared/components/inheritance/add/add';
import { ValidatorsCustom } from '../../../../../shared/helpers/validators/validators-custom';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../components/imports/components-default.imports';
import { AddBankAccountCardsImports, AddBankAccountCardsProviders } from './imports/add-bank-account-cards.imports';
import { BankAccountAddService } from './services/bank-account-add.service';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';


@Component({
  selector: 'add-bank-account-cards',
  templateUrl: './add-bank-account-cards.component.html',
  styleUrls: ['./add-bank-account-cards.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    AddBankAccountCardsImports
  ],
  providers: [
    AddDefaultProviders,
    AddBankAccountCardsProviders
  ]
})
export class AddBankAccountCardsComponent extends BaseForm implements OnInit {

  institutionName: string;

  constructor(
    protected _bankAccountService: BankAccountAddService,
    private _fb: FormBuilder,
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
