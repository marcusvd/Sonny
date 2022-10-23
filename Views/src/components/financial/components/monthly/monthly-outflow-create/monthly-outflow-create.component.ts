import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonthlyOutflowService } from './services/monthly-outflow.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';


@Component({
  selector: 'monthly-out-create',
  templateUrl: './monthly-outflow-create.component.html',
  styleUrls: ['./monthly-outflow-create.component.css']
})
export class MonthlyOutFlowCreateComponent extends BaseForm implements OnInit {

  startDate = new Date();
  amountStartedResponsiveCols: number = 2;
  amountStartedResponsiveRowHeight: string = '100px'

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
  onResize() {
//this._responsive.observe([]).
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
  }

}
