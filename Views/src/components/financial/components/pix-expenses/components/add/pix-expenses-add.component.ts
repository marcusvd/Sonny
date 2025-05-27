
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';

import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';

import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { PixExpenseDto } from '../../dto/pix-expense-dto';
import { PixExpensesService } from './services/pix-expenses.service';


@Component({
  selector: 'pix-expenses',
  templateUrl: './pix-expenses-add.component.html',
  styleUrls: ['./pix-expenses-add.component.css'],
  providers: [
    PixExpensesService,
    CategoryExpensesService
  ],
  standalone: true,
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BankAccountMatSelectSingleComponent,
    CategorySubcategoryExpensesSelectComponent,
    BtnGComponent,
    PixesExpensesFieldsComponent
  ],

})

export class PixExpensesAddComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _pixExpensesService: PixExpensesService,

  ) {super()}

  


  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  getPixId(value: number) {
    this.formMain.get('pixOutId').setValue(value);
  }

  save() {
    if (this.alertSave(this.formMain)) {
      this._pixExpensesService.save(this.formMain);
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

  ngOnInit(): void {
    this.formLoad();

  }

}
