import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DateJustDayComponent } from 'src/shared/components/date-just-day/date-just-day.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { FinancingsLoansExpensesService } from './services/financings-loans-expenses.service';


@Component({
    selector: 'financings-loans-expenses',
    templateUrl: './add-financings-loans-expenses.component.html',
    styleUrls: ['./add-financings-loans-expenses.component.css'],
    providers: [
        FinancingsLoansExpensesService,
        CategoryExpensesService
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTooltipModule,
        CurrencyMaskModule,
        PtBrCurrencyPipe,
        TitleComponent,
        SubTitleComponent,
        DateJustDayComponent,
        BtnGComponent,
        CategorySubcategoryExpensesSelectComponent
    ]
})

export class AddFinancingsLoansExpensesComponent extends Add implements OnInit {


  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: FinancingsLoansExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.FinancingLoans;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }
  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
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

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


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
    this.screen();
  }

}
