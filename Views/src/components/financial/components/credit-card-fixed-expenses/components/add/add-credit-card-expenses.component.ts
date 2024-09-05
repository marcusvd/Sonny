import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DateJustDayComponent } from 'src/shared/components/date-just-day/date-just-day.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { SelectedPaymentDto } from 'src/shared/components/get-entities/bank-account/dto/selected-payment-dto';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { BankAccountDto } from '../../../bank-account-cards/dto/bank-account-dto';
import { CardDto } from '../../../bank-account-cards/dto/card-dto';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { CategoryExpenseDto } from '../../../common-components/category-subcategory-expenses/dto/category-expense-dto';
import { SubcategoryExpenseDto } from '../../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto';
import { CreditCardExpensesDto } from '../../dto/credit-card-expenses-dto';
import { AddCreditCardExpensesService } from './services/add-credit-card-expenses.service';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';



@Component({
  selector: 'add-credit-card-expenses',
  templateUrl: './add-credit-card-expenses.component.html',
  styleUrls: ['./add-credit-card-expenses.component.css'],
  providers: [
    AddCreditCardExpensesService,
    CategoryExpensesService
  ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
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
    PtBrDatePipe,
    TitleComponent,
    SubTitleComponent,
    DateJustDayComponent,
    CategorySubcategoryExpensesSelectComponent,
    BankAccountMatSelectSingleComponent,
    BtnGComponent
  ],

})

export class AddCreditCardExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _dialog: MatDialog,
    private _expensesService: AddCreditCardExpensesService,
    private _fillersService: CategoryExpensesService,
    private _responsive: BreakpointObserver,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Month;

  cardType = TypeCardDtoEnum.Credit;

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


  fillersExpenses = new Observable<CategoryExpenseDto[]>();

  validation(field: string, addRemove: boolean) {
    if (addRemove) {
      this.formMain.get(field).addValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }

    if (!addRemove) {
      this.formMain.get(field).setValue(null);
      this.formMain.get(field).removeValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }
  }

  subcategoriesExpenses = new Observable<SubcategoryExpenseDto[]>();
  selectedCategoryExpensesId(id: number) {
    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpenseDto[]) => {
        return x.find(Xid => Xid.id == id).subcategoriesExpenses
      }),
    )
    this.subcategoriesExpenses = selected;
  }

  formLoad(x?: CreditCardExpensesDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name || '', [Validators.required]],
      userId: [x?.userId || this.userId, [Validators.required]],
      companyId: [x?.user || this.companyId, [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId || '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId || '', [Validators.required]],
      bankAccountId: [x?.bankAccountId || '', [Validators.required]],
      cardId: [x?.cardId, [Validators.required]],
      installmentNumber: [1, [Validators.required]],
      expenseDay: ['', [Validators.required]],
      expires: ['', [Validators.required]],
      document: [x?.description || '', []],
      registered: [x?.registered || new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }
  // formLoad() {
  //   this.formMain = this._fb.group({
  //     categoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
  //     subcategoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
  //     userId: [this.userId, [Validators.required, Validators.min(1)]],
  //     description: ['', [Validators.required, Validators.maxLength(150)]],
  //     companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
  //     expires: ['', [Validators.required]],
  //     price: ['', [Validators.required, Validators.min(1)]],
  //     linkCopyBill: ['', [Validators.maxLength(350)]],
  //     userLinkCopyBill: ['', [Validators.maxLength(50)]],
  //     passLinkCopyBill: ['', [Validators.maxLength(20)]],
  //     fixedExpensesTrackings: this._fb.array([])
  //   })
  // }

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

  selectedCard = new CardDto();

  selectedCreditCard(cardId: number) {
    this.selectedCard = this.bankAccount?.cards.find(x => x.id == cardId);

    // const expenseDay = new Date(this.formMain.get('expenseDay').value)

    // const closingDateToDate = new Date(this.selectedCard.closingDate);
    // const closingDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), closingDateToDate.getDate())

    // const expiresDateToDate = new Date(this.selectedCard.expiresDate);
    // const expiresDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), expiresDateToDate.getDate())



    // if (expenseDay <= closingDate)
    //     this.test = expiresDate;
    //   else{
    //     this.test = new Date(expenseDay.getFullYear(), expenseDay.getMonth()+1, expiresDateToDate.getDate())
    //   }
    // else 
    // 
  }
  firstInstallmentExpires = new Date();
  onDateChanged() {
    const expenseDay = new Date(this.formMain.get('expenseDay').value)
    const closingDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), new Date(this.selectedCard.closingDate).getDate())

    const expiresDateToDate = new Date(this.selectedCard.expiresDate);
    const expiresDate = new Date(expenseDay.getFullYear(), expenseDay.getMonth(), expiresDateToDate.getDate())

    if (expenseDay <= closingDate)
      this.firstInstallmentExpires = expiresDate;
    else
      this.firstInstallmentExpires = new Date(expenseDay.getFullYear(), expenseDay.getMonth() + 1, expiresDateToDate.getDate())
  }

  makeEntityToUpdate(entity: SelectedPaymentDto) {

    this.formMain.get('bankAccountId').setValue(entity.idBankAccount);
    this.formMain.get('cardId').setValue(entity.idCard);
  
    if (this.formMain.get('cardId').value == '')
      this.formMain.get('cardId').setValue(null);

  }

  bankAccount = new BankAccountDto();
  onSelectedBanckAccountelected(bankAccount: BankAccountDto) {
    this.bankAccount = bankAccount;
    console.log(bankAccount)
  }

  save() {

    this.formMain.get('expires').setValue(this.firstInstallmentExpires);
    if (this.alertSave(this.formMain)) {
      this._expensesService.save(this.formMain);
    }
  }




  ngOnInit(): void {
    this.fillersExpenses = this._fillersService.getFillers();
    this.formLoad();
    this.screen();
    // this.validation('categoryExpensesId', true);
  }

}
