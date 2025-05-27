
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Payment } from 'src/shared/components/inheritance/payment/payment';


import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
import { VariableExpensesService } from './services/variable-expenses.service';
import { ImportsAddVariableExpenses,  ProvidersAddVariable } from '../imports/imports-variable-expenses';


@Component({
  selector: 'variable-expenses',
  templateUrl: './variable-expenses-add.component.html',
  styleUrls: ['./variable-expenses-add.component.css'],
  standalone: true,
  imports: [
    ImportsAddVariableExpenses
  ],
  providers: [
    ProvidersAddVariable
  ]

})

export class VariableExpensesAddComponent extends Payment implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _variableExpensesService: VariableExpensesService,

  ) { super() }

  payCycle = PayCycleEnumDto.Variable;
  cardType = TypeCardDtoEnum.Credit;

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  formLoad(x?: VariableExpenseDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      userId: [x?.userId ?? this.userId, [Validators.required]],
      companyId: [x?.user ?? this.companyId, [Validators.required]],
      name: [x?.name || '', [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId || '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId || '', [Validators.required]],
      bankAccountId: [x?.bankAccountId || '', [Validators.required]],
      cardId: [x?.cardId || '', []],
      pixId: [x?.pixId || '', []],
      pixExpense: this.subFormLoad(),
      othersPaymentMethods: [x?.othersPaymentMethods || '', []],
      place: [x?.place || '', [Validators.required]],
      wasPaid: [x?.wasPaid || new Date(), [Validators.required]],
      expires: [new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }

  subFormLoad() {
    return this.subForm = this._fb.group({
      benefitedKey: ['', []],
      expenseDay: [new Date(), []],
      price: [0, [Validators.required]],
    })
  }

  save() {
    if (this.alertSave(this.formMain)) {
      this._variableExpensesService.save(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }

  ngOnInit(): void {
    this.formLoad();

  }

}
