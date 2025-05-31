
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


import { Router } from '@angular/router';

import { Add } from 'src/shared/components/inheritance/add/add';


import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { AddDefaultImports, AddDefaultProviders, ListDefaultImports } from '../../../../../../components/imports/components-default.imports';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { AddYearlyFixedExpensesService } from './services/add-yearly-fixed-expenses.service';
import { YearlyFixedExpensesAddValidator } from './validators/yearly-fixed-expenses-add.validator';

@Component({
  selector: 'yearly-fixed-expenses',
  templateUrl: './yearly-fixed-expenses-add.component.html',
  styleUrls: ['./yearly-fixed-expenses-add.component.css'],
  standalone: true,
  imports: [

    // TitleComponent,
    // SubTitleComponent,

    // CategorySubcategoryExpensesSelectComponent,
    // LinkCopyBillComponent
    AddDefaultImports,
    ListDefaultImports
  ],
  providers: [
    AddDefaultProviders
  ],

})

export class YearlyFixedExpensesAddComponent extends Add implements OnInit {

  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _addYearlyFixedExpensesService: AddYearlyFixedExpensesService,

    private _router: Router,
  ) { super() }

  payCycle = PayCycleEnumDto.Year;



  private valYearlyAction = YearlyFixedExpensesAddValidator;
  get validatorYearlyAction() {
    return this.valYearlyAction
  }

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      categoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      subcategoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.maxLength(500)]],
      start: ['', [Validators.required]],
      expires: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      autoRenew: [false, []],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
    })
  }

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  onStartDateChanged() {
    const startDate = new Date(this.formMain.get('start').value);
    const expires = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    this.formMain.get('expires').setValue(expires);
  }

  save() {
    if (this.alertSave(this.formMain))
      this._addYearlyFixedExpensesService.save(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();

  }

}
