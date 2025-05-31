
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../imports/components-default.imports';
import { PixExpenseDto } from '../../dto/pix-expense-dto';
import { AddPixExpensesImports, AddPixExpensesProviders } from './imports/add-pix-expenses.imports';
import { AddPixExpensesService } from './services/add-pix-expenses.service';


@Component({
  selector: 'pix-expenses',
  templateUrl: './add-pix-expenses.component.html',
  styleUrls: ['./add-pix-expenses.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    AddPixExpensesImports
  ],
  providers: [
    AddDefaultProviders,
    AddPixExpensesProviders
  ],

})

export class AddPixExpensesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _addPixExpensesService: AddPixExpensesService,
  ) {super()}


  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  getPixId(value: number) {
    this.formMain.get('pixOutId')?.setValue(value);
  }

  save() {
    if (this.alertSave(this.formMain)) {
      this._addPixExpensesService.save(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }
  }

  formLoad(x?: PixExpenseDto) {
    this.formMain = this._fb.group({
      companyId: [this.companyId, [Validators.required]],
      userId: [this.userId, [Validators.required]],
      pixOutId: [x?.pixOutId, [Validators.required]],
      benefitedName: [x?.benefitedName, [Validators.required]],
      benefitedKey: [x?.benefitedKey, [Validators.required]],
      price: [x?.price, [Validators.required]],
      bankAccountId: ['', []],
      expenseDay: [x?.expenseDay, [Validators.required]],
      monthlyFixedExpenseId: [x?.monthlyFixedExpenseId ?? null, []],
      yearlyFixedExpenseId: [x?.yearlyFixedExpenseId ?? null, []],
      variableExpenseId: [x?.variableExpenseId ?? null, []],
      financingAndLoanExpenseId: [x?.financingAndLoanExpenseId ?? null, []],
      description: [x?.description, []],
      //just to work inside bank component
      pixId: ['', []],
      cardId: [null, []],
      othersPaymentMethods: [null, []],
    })
  }

  ngOnInit(): void {this.formLoad();}

}
