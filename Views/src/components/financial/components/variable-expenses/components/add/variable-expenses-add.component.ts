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
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Payment } from 'src/shared/components/inheritance/payment/payment';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { PixesExpensesFieldsComponent } from '../../../common-components/pixes-expenses/pixes-expenses-fields.component';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
import { VariableExpensesService } from './services/variable-expenses.service';


@Component({
    selector: 'variable-expenses',
    templateUrl: './variable-expenses-add.component.html',
    styleUrls: ['./variable-expenses-add.component.css'],
    providers: [
        VariableExpensesService,
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
        TitleComponent,
        SubTitleComponent,
        BankAccountMatSelectSingleComponent,
        CategorySubcategoryExpensesSelectComponent,
        BtnGComponent,
        PixesExpensesFieldsComponent
    ]
})

export class VariableExpensesAddComponent extends Payment implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _variableExpensesService: VariableExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Variable;
  cardType = TypeCardDtoEnum.Credit;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
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
    })
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
      this._variableExpensesService.save(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
