import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
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
    FlexLayoutModule,
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
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
  }

  getPixId(value: number) {
    this.formMain.get('pixOutId').setValue(value);
  }

  screenFieldPosition: string = 'row';
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
    this.screen();
  }

}
