import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FinancingLoansService } from '../../../financing-loans/services/financing-loans.service';
import { EssentialExpensesService } from '../../services/essential-expenses-service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
@Component({
  selector: 'essential-expenses-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [EssentialExpensesService]
})
export class EssentialExpensesCreateComponent extends BaseForm implements OnInit {

  title: string = 'FINANCEIRO';
  subTitle: string = 'Financiamento';

  startDate = new Date();

  expirationCols: number;
  expirationRowHeight: string = '120px'

  cycleExpensesCols: number;
  cycleExpensesRowHeight: string = '160px';

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
    private _financingLoansService: FinancingLoansService,
    private _responsive: BreakpointObserver,
    private _essentialExpensesService: EssentialExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  formLoad() {
    this.formMain = this._fb.group({
      expensesName: ['LUZ', [Validators.required]],
      cyclePayment: ['MENSAL', [Validators.required]],
      expiration: ['', [Validators.required]],
      comments: ['', [Validators.maxLength(150)]],
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.expirationCols = 1;
            this.cycleExpensesCols = 1;
            break;
          }
          case 'small': {
            this.expirationCols = 1;
            this.cycleExpensesCols = 1;
            break;
          }
          case 'medium': {
            this.expirationCols = 1;
            this.cycleExpensesCols = 2;
            break;
          }
          case 'large': {
            this.expirationCols = 1;
            this.cycleExpensesCols = 2;

            break;
          }
          case 'xlarge': {
            this.expirationCols = 1;
            this.cycleExpensesCols = 2;
            break;
          }
        }
      }
    })
  }

  save() {
    this._financingLoansService.save(this.formMain).subscribe((result: boolean) => {
      if (result) {
        this.formMain.reset();
      }
    })

  }
  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
