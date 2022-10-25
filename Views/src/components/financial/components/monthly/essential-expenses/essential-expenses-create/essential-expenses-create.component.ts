import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { TypePayCrudService } from 'src/components/financial/services/type-pay-crud.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { MonthlyOutflowService } from '../../monthly-outflow-create/services/monthly-outflow.service';
import { EssentialExpensesService } from '../services/essential-expenses-service';
@Component({
  selector: 'essential-expenses-create',
  templateUrl: './essential-expenses-create.component.html',
  styleUrls: ['./essential-expenses-create.component.css'],
  providers:[EssentialExpensesService]
})
export class EssentialExpensesCreateComponent extends BaseForm implements OnInit {

    title:string = 'FINANCEIRO';
    subTitle:string = 'Financiamento';

    startDate = new Date();

    expirationCols:number;
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
      private _monthlyOutflowService: MonthlyOutflowService,
      private _responsive: BreakpointObserver,
      private _essentialExpensesService: EssentialExpensesService,
      override _validatorsService: ValidatorsService,
       override _breakpointObserver: BreakpointObserver,
      ) { super(_validatorsService, _breakpointObserver) }


    formLoad() {
      this.formMain = this._fb.group({
        name: ['', [Validators.required, Validators.maxLength(150)]],
        amount: ['', []],
        started: ['', []],
        expiration: ['', []],
        installment: ['', []],
        user: ['', []],
        password: ['', []],
        institution: ['', [Validators.required, Validators.maxLength(150)]],
        duplicateurl: ['', []],
        description: ['', []],
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
      this._monthlyOutflowService.save(this.formMain).subscribe((result: boolean) => {
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
