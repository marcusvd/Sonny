import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DateJustDayComponent } from 'src/shared/components/date-just-day/date-just-day.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { LinkCopyBillComponent } from '../../../common-components/link-copy-bill/link-copy-bill.component';
import { MonthlyFixedExpensesService } from './services/monthly-fixed-expenses.service';


@Component({
  selector: 'monthly-fixed-expenses',
  templateUrl: './monthly-fixed-expenses-add.component.html',
  styleUrls: ['./monthly-fixed-expenses-add.component.css'],
  providers: [
    MonthlyFixedExpensesService,
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
    DateJustDayComponent,
    CategorySubcategoryExpensesSelectComponent,
    LinkCopyBillComponent,
    BtnGComponent
  ],

})

export class MonthlyFixedExpensesAddComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _monthlyFixedExpensesService: MonthlyFixedExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Month;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
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
      this._monthlyFixedExpensesService.save(this.formMain);
      this.saveBtnEnabledDisabled = true;
    }
  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
