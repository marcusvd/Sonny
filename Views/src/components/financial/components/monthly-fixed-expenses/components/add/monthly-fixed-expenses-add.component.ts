

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Add } from 'src/shared/components/inheritance/add/add';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { AddMonthlyFixedExpensesService } from '../../components/add/services/add-monthly-fixed-expenses.service';
import { AddDefaultImports, AddDefaultProviders } from '../../../../../../components/imports/add-default.imports';
import { AddMonthlyFixedExpensesImports, AddMonthlyFixedExpensesProviders } from './imports/add-monthly-fixed-expenses.imports';

@Component({
  selector: 'monthly-fixed-expenses',
  templateUrl: './monthly-fixed-expenses-add.component.html',
  styleUrls: ['./monthly-fixed-expenses-add.component.css'],
  standalone: true,
  imports: [
    AddDefaultImports,
    AddMonthlyFixedExpensesImports

  ],
  providers: [
    AddDefaultProviders,
    AddMonthlyFixedExpensesProviders
  ],

})

export class MonthlyFixedExpensesAddComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _addMonthlyFixedExpensesService: AddMonthlyFixedExpensesService,

  ) {super()}

  payCycle = PayCycleEnumDto.Month;



  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  formLoad() {
    this.formMain = this._fb.group({
      id: [0, []],
      name: ['', [Validators.required, Validators.maxLength(150)]],
      categoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      subcategoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(150)]],
      companyId: [this.companyId, [Validators.required]],
      expires: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
    })
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._addMonthlyFixedExpensesService.save(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }
  }

  ngOnInit(): void {
    this.formLoad();

  }

}
