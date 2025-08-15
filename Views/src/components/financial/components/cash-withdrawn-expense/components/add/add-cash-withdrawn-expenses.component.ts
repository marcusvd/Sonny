
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Payment } from '../../../../../../shared/components/inheritance/payment/payment';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../imports/components-default.imports';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';

import { AddCashWithdrawnExpensesService } from '../../services/add-cash-withdrawn-expenses.service';
import { ImportsAddCashWithdrawnExpenses, ProvidersAddCashWithdrawnExpenses } from '../imports/add-cash-withdrawn-expenses.imports';
import { CashWithdrawnExpenseDto } from '../../dto/cash-withdrawn-expenses-dto';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

@Component({
  selector: 'add-cash-withdrawn-expenses',
  templateUrl: './add-cash-withdrawn-expenses.component.html',
  styleUrls: ['./add-cash-withdrawn-expenses.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    ImportsAddCashWithdrawnExpenses
  ],
  providers: [
    AddDefaultProviders,
    ProvidersAddCashWithdrawnExpenses
  ]
})

export class AddCashWithdrawnExpensesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _variableExpensesService: AddCashWithdrawnExpensesService,

  ) { super() }

  payCycle = PayCycleEnumDto.Variable;
  cardType = TypeCardDtoEnum.Credit;

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  formLoad(x?: CashWithdrawnExpenseDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      userId: [x?.userId ?? this.userId, [Validators.required]],
      companyId: [x?.companyId ?? this.companyId, [Validators.required]],
      name: [x?.name || '', [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId || '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId || '', [Validators.required]],
      bankAccountId: [x?.bankAccountId || '', [Validators.required]],
      place: [x?.place || '', [Validators.required]],
      withdrawnOn: [x?.withdrawnOn || new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }

  // subFormLoad() {
  //   return this.subForm = this._fb.group({
  //     benefitedKey: ['', []],
  //     expenseDay: [new Date(), []],
  //     price: [0, [Validators.required]],
  //   })
  // }

  save() {
    if (this.alertSave(this.formMain)) {
      this._variableExpensesService.save(this.formMain);
      // this.paymentBtnEnabledDisabled = true;
    }

  }

  ngOnInit(): void {
    this.formLoad();

  }

}
