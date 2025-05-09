
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Payment } from 'src/shared/components/inheritance/payment/payment';

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
  standalone: true,
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
  ],

})

export class VariableExpensesAddComponent extends Payment implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _variableExpensesService: VariableExpensesService,

  ) {super()}

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

    save() {
    if (this.alertSave(this.formMain)) {
      this._variableExpensesService.save(this.formMain);
      this.paymentBtnEnabledDisabled = true;
    }

  }

  ngOnInit(): void {
    this.formLoad();

  }

}
