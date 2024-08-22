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

import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { CategoryExpenseDto } from '../../../common-components/category-subcategory-expenses/dto/category-expense-dto';
import { SubcategoryExpenseDto } from '../../../common-components/category-subcategory-expenses/dto/subcategory-expense-dto';
import { FinancingsLoansExpensesService } from './services/financings-loans-expenses.service';


@Component({
  selector: 'financings-loans-expenses',
  templateUrl: './add-financings-loans-expenses.component.html',
  styleUrls: ['./add-financings-loans-expenses.component.css'],
  providers: [
    FinancingsLoansExpensesService,
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
    TitleComponent,
    SubTitleComponent,
    DateJustDayComponent,
    BtnGComponent,
    CategorySubcategoryExpensesSelectComponent
  ],

})

export class AddFinancingsLoansExpensesComponent extends Add implements OnInit {

 
  screenFieldPosition: string = 'row';
 

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _services: FinancingsLoansExpensesService,
    // private _fillersService: CategoryExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }



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

  formLoad() {
    this.formMain = this._fb.group({
      categoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      userId: [this.userId, [Validators.required, Validators.min(1)]],
      subcategoryExpenseId: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      expires: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      installmentNumber: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      linkCopyBill: ['', [Validators.maxLength(350)]],
      userLinkCopyBill: ['', [Validators.maxLength(50)]],
      passLinkCopyBill: ['', [Validators.maxLength(20)]],
      fixedExpensesTrackings: this._fb.array([])
    })
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


  makeSpaceFields() {

    if (this.screenFieldPosition === 'row') {
      if (
        (this?.formMain?.get('expiration')?.hasError('required') || this?.formMain?.get('expiration')?.hasError('min') || this?.formMain?.get('expiration')?.hasError('max')) && this?.formMain?.get('expiration')?.touched
        ||
        (this?.formMain?.get('numberInstallment')?.hasError('required') || this?.formMain?.get('numberInstallment')?.hasError('max')) && this?.formMain?.get('numberInstallment')?.touched
      )
        return true;
      else
        return false;
    }
    else
      return false;

  }


  save() {

    if (this.alertSave(this.formMain))
      this._services.save(this.formMain);

  }

  ngOnInit(): void {
    // this.fillersExpenses = this._fillersService.getFillers();
    this.formLoad();
    this.screen();
  }

}
