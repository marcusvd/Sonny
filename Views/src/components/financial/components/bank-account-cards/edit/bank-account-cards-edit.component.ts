import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';



import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BankAccountCardsEditService } from 'src/components/financial/components/bank-account-cards/edit/services/bank-account-edit-cards.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { PixComponent } from 'src/shared/components/financial/pix/pix.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

import { BankAccountComponent } from '../../common-components/bank-account/bank-account.component';
import { BankCardsComponent } from '../../common-components/bank-cards/bank-cards.component';
import { BankAccountDto } from '../dto/bank-account-dto';
import { CardDto } from '../dto/card-dto';
import { PixDto } from '../dto/pix-dto';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'bank-account-cards-edit',
  templateUrl: './bank-account-cards-edit.component.html',
  styleUrls: ['./bank-account-cards-edit.component.css'],
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
  providers: [BankAccountCardsEditService]
})
export class BankAccountCardsEditComponent extends BaseForm implements OnInit {

  cards: CardDto[];
  pixes: PixDto[];
  institution: string;

  constructor(
    private _bankAccounteditService: BankAccountCardsEditService,
    private _fb: FormBuilder,

    private _actRouter: ActivatedRoute,
  ) {super()}

  

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  get getDate(): Date {
    return new Date();
  }



  formLoad(entity: BankAccountDto) {
    return this.formMain = this._fb.group({
      id: [entity.id || 0, [Validators.required]],
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      holder: [entity.holder, [Validators.required, Validators.maxLength(100)]],
      institution: [entity.institution, [Validators.required, Validators.maxLength(100)]],
      agency: [entity.agency, [Validators.required, Validators.maxLength(20)]],
      managerName: [entity.managerName, [Validators.maxLength(50)]],
      managerContact: [entity.managerContact, [Validators.maxLength(100)]],
      account: [entity.account, [Validators.required, Validators.maxLength(100)]],
      type: [entity.type, [Validators.required]],
      balance: [entity.balance, [Validators.required]],
      description: [entity.description, [Validators.maxLength(100)]],
      pixes: this._fb.array([]),
      cards: this._fb.array([]),
    })
  }

  update() {
    if (this.alertSave(this.formMain)) {
      this._bankAccounteditService.update(this.formMain);
    }
  }

  getEntityId(id: number) {
    const bankAccount: Observable<BankAccountDto> = this._bankAccounteditService.loadById$('GetFnBankAccountByIdAllIncluded', id.toString());

    this.cards = [];
    this.pixes = [];

    bankAccount.subscribe(x => {
      this.formLoad(x);
      this.institution = x.institution;
      console.log(x.cards)
      this.cards = x.cards;
      this.pixes = x.pixes;
    });

  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);

  }

}
