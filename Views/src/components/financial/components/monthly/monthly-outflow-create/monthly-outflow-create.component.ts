import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthlyOutflowService } from './services/monthly-outflow.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';


@Component({
  selector: 'monthly-out-create',
  templateUrl: './monthly-outflow-create.component.html',
  styleUrls: ['./monthly-outflow-create.component.css']
})
export class MonthlyOutFlowCreateComponent extends BaseForm implements OnInit {

  title:string = 'FINANCEIRO';
  subTitle:string = 'Financiamento';

  startDate = new Date();

  amountStartedExpirationInstallmentCols:number;
  amountStartedExpirationInstallmentRowHeight: string = '140px'

  userPasswordCols: number;
  userPasswordRowHeight: string = '140px';


  constructor(
    private _fb: FormBuilder,
    private _monthlyOutflowService: MonthlyOutflowService,
    private _responsive: BreakpointObserver,
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
            this.amountStartedExpirationInstallmentCols = 1;
             this.userPasswordCols = 1;
            break;
          }
          case 'small': {
            this.amountStartedExpirationInstallmentCols = 1;
            this.userPasswordCols = 1;
            break;
          }
          case 'medium': {
            this.amountStartedExpirationInstallmentCols = 2;
            this.userPasswordCols = 2;
            break;
          }
          case 'large': {
            this.amountStartedExpirationInstallmentCols = 4;
            this.userPasswordCols = 2;

            break;
          }
          case 'xlarge': {
            this.amountStartedExpirationInstallmentCols = 4;
             this.userPasswordCols = 2;
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
