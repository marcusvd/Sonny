import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AddDefaultImports, AddDefaultProviders } from '../../../../../../components/imports/components-default.imports';
import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
import { ToolTips } from '../../../../../../shared/services/messages/snack-bar.service';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { AddFinancingsLoansExpensesImports, AddFinancingsLoansExpensesProviders } from '../add/imports/financings-loans-expenses-imports';
import { FinancingsLoansExpensesService } from './services/financings-loans-expenses.service';


@Component({
  selector: 'financings-loans-expenses',
  templateUrl: './add-financings-loans-expenses.component.html',
  styleUrls: ['./add-financings-loans-expenses.component.scss'],
  standalone: true,
  imports: [
    AddFinancingsLoansExpensesImports,
    AddDefaultImports,
  ],
  providers: [
    AddFinancingsLoansExpensesProviders,
    AddDefaultProviders
  ],

})

export class AddFinancingsLoansExpensesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: FinancingsLoansExpensesService,

  ) { super() }

  payCycle = PayCycleEnumDto.FinancingLoans;


  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  add() {
    this._router.navigateByUrl('/financial/category-expenses-add-edit')
  }

  totalPriceToBePaid = 0;
  totalPriceInterest = 0;
  percentageInterest = 0;

  installmentCacl() {

    const totalPrice: number = this?.formMain?.get('installmentPrice').value;
    const installments: number = this?.formMain?.get('installmentsQuantity').value;

    const totalPriceToBePaid = totalPrice * installments;
    this.totalPriceToBePaid = totalPriceToBePaid;

    this?.formMain?.get('totalPriceToBePaid')?.setValue(totalPriceToBePaid);

    this.totalPriceInterest = totalPriceToBePaid - this?.formMain?.get('totalPriceFinancingOrLoan')?.value;

    this.percentageInterest = (this.totalPriceInterest / this?.formMain?.get('totalPriceFinancingOrLoan')?.value) * 100;

    this.setForm();
  }

  setForm() {
    this?.formMain?.get('totalPriceToBePaid')?.setValue(this.totalPriceToBePaid);
    this?.formMain?.get('totalPriceInterest')?.setValue(this.totalPriceInterest);
    this?.formMain?.get('totalPercentageInterest')?.setValue(this.percentageInterest);
  }

  formLoad() {
    this.formMain = this._fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      companyId: [this.companyId, [Validators.required]],
      categoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      subcategoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      expires: [new Date(), [Validators.required]],
      start: [new Date(), [Validators.required]],
      installmentPrice: ['', [Validators.required, Validators.min(1)]],
      totalPriceInterest: ['', [Validators.required]],
      totalPercentageInterest: ['', [Validators.required]],
      installmentsQuantity: [1, [Validators.required]],
      totalPriceToBePaid: ['', [Validators.required, Validators.min(1)]],
      totalPriceFinancingOrLoan: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
    })
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._services.save(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }
  }

  ngOnInit(): void {
    this.formLoad();

  }

}
