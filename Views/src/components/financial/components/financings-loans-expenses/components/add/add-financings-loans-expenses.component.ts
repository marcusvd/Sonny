
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';

import { TitleComponent } from 'src/shared/components/title/default-title/title.component';

import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { FinancingsLoansExpensesService } from './services/financings-loans-expenses.service';
import { ImportsAddFinancingsLoansExpenses, ProvidersAddFinancingsLoansExpenses } from '../add/imports/imports-financings-loans-expenses';


@Component({
  selector: 'financings-loans-expenses',
  templateUrl: './add-financings-loans-expenses.component.html',
  styleUrls: ['./add-financings-loans-expenses.component.css'],
  standalone: true,
  imports: [
    ImportsAddFinancingsLoansExpenses
  ],
  providers: [
    ProvidersAddFinancingsLoansExpenses
  ],

})

export class AddFinancingsLoansExpensesComponent extends Add implements OnInit {


  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: FinancingsLoansExpensesService,

  ) {super()}

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
