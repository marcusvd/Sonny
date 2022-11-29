import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { EssentialExpensesService } from '../../services/essential-expenses-service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
@Component({
  selector: 'essential-expenses-create',
  templateUrl: './essential-expenses-create.component.html',
  styleUrls: ['./essential-expenses-create.component.css'],
  providers: [EssentialExpensesService]
})
export class EssentialExpensesCreateComponent extends BaseForm implements OnInit {

  title: string = 'FINANCEIRO';
  subTitle: string = 'Financiamento';

  startDate = new Date();

  userPasswordCols: number;
  userPasswordRowHeight: string = '140px';

  expirationNameCols: number;
  expirationNameRowHeight: string = '180px'

  cycleExpensesCols: number;
  cycleExpensesRowHeight: string = '180px';

  defaultSelected = 'LUZ';
  get essentialExpensesArray(): any[] {
    return this._essentialExpensesService.EssentialExpensesArray
  }

  defaultSelectedCycle = 'MENSAL';
  get expirationCycleArray(): any[] {
    return this._essentialExpensesService.expirationCycleArray
  }

  constructor(
    private _fb: FormBuilder,
    private _essentialExpensesService: EssentialExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  formLoad() {
    this.formMain = this._fb.group({
      name: ['LUZ', [Validators.required, Validators.maxLength(100)]],
      nameOther: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(100)]),
      cyclePayment: ['MENSAL', [Validators.required]],
      expiration: ['', [Validators.required]],
      duplicate: ['', [Validators.maxLength(250)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.maxLength(20)]],
      comments: ['', [Validators.maxLength(200)]],
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.expirationNameCols = 1;
            this.cycleExpensesCols = 1;
            this.userPasswordCols = 1;
            break;
          }
          case 'small': {
            this.expirationNameCols = 1;
            this.cycleExpensesCols = 1;
            this.userPasswordCols = 1;
            break;
          }
          case 'medium': {
            this.expirationNameCols = 2;
            this.cycleExpensesCols = 2;
            this.userPasswordCols = 2;
            break;
          }
          case 'large': {
            this.expirationNameCols = 2;
            this.cycleExpensesCols = 2;
            this.userPasswordCols = 2;
            break;
          }
          case 'xlarge': {
            this.expirationNameCols = 2;
            this.cycleExpensesCols = 2;
            this.userPasswordCols = 2;
            break;
          }
        }
      }
    })
  }

  expenses(value: string) {
    const expenseName = value;
    if (expenseName.toLocaleLowerCase() != 'outros') {
      this.formMain.controls['nameOther'].disable();
    }
    else {
      this.formMain.controls['nameOther'].enable();

    }
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._essentialExpensesService.save(this.formMain);
      this.formMain.controls['nameOther'].disable();
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.formMain.controls['nameOther'].disable();
  }

}
