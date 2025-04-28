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
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { LinkCopyBillComponent } from '../../../common-components/link-copy-bill/link-copy-bill.component';
import { YearlyFixedExpensesService } from './services/yearly-fixed-expenses.service';
import { YearlyFixedExpensesAddValidator } from './validators/yearly-fixed-expenses-add.validator';

@Component({
  selector: 'yearly-fixed-expenses',
  templateUrl: './yearly-fixed-expenses-add.component.html',
  styleUrls: ['./yearly-fixed-expenses-add.component.css'],
  providers: [
    YearlyFixedExpensesService,
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
    BtnGComponent,
    CategorySubcategoryExpensesSelectComponent,
    LinkCopyBillComponent

  ],

})

export class YearlyFixedExpensesAddComponent extends Add implements OnInit {

  screenFieldPosition: string = 'row';

  constructor(
    private _fb: FormBuilder,
    private _yearlyFixedExpensesService: YearlyFixedExpensesService,
    override _breakpointObserver: BreakpointObserver,
    private _router: Router,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Year;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

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

  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
  }

  onStartDateChanged() {
    const startDate = new Date(this.formMain.get('start').value);
    const expires = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    this.formMain.get('expires').setValue(expires);
  }

  save() {
    if (this.alertSave(this.formMain))
      this._yearlyFixedExpensesService.save(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
