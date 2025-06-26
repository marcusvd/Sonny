import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { BankAccountCardsEditService } from '../../../../../components/financial/components/bank-account-cards/edit/services/bank-account-edit-cards.service';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../components/imports/components-default.imports';
import { AddBankAccountCardsImports } from '../add/imports/add-bank-account-cards.imports';
import { BankAccountDto } from '../dto/bank-account-dto';
import { CardDto } from '../dto/card-dto';
import { PixDto } from '../dto/pix-dto';

@Component({
  selector: 'edit-bank-account-cards',
  templateUrl: './edit-bank-account-cards.component.html',
  styleUrls: ['./edit-bank-account-cards.component.css'],
  standalone: true,
  imports: [
    AddBankAccountCardsImports,
    AddDefaultImports,
  ],
  providers: [
    AddDefaultProviders,
    BankAccountCardsEditService
  ]
})
export class EditBankAccountCardsComponent extends BaseForm implements OnInit {

  cards: CardDto[];
  pixes: PixDto[];
  institution: string;

  constructor(
    private _bankAccounteditService: BankAccountCardsEditService,
    private _fb: FormBuilder,

    private _actRouter: ActivatedRoute,
  ) { super() }




  get getDate(): Date {
    return new Date();
  }



  formLoad(entity: BankAccountDto) {
    return this.formMain = this._fb.group({
      id: [entity.id ?? 0, [Validators.required]],
      companyId: [entity.companyId ?? this.companyId, [Validators.required]],
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
      this.cards = x.cards;
      this.pixes = x.pixes;
    });

  }

  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);

  }

}
