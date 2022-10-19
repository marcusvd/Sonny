import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { environment } from 'src/environments/environment';
import { MonthlyOutFlowDto } from './dto/monthly-outflow-dto';
import {  MonthlyOutflowService } from './services/monthly-outflow.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';


@Component({
  selector: 'monthly-out-create',
  templateUrl: './monthly-outflow-create.component.html',
  styleUrls: ['./monthly-outflow-create.component.css']
})
export class MonthlyOutFlowCreateComponent extends BaseForm implements OnInit {

  public _startDate = new Date();

  constructor(
    private _fb: FormBuilder,
    private _monthlyOutflowService: MonthlyOutflowService,
  ) { super() }

  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      institution: ['', []],
      amount: ['', []],
      started: ['', []],
      expiration: ['', []],
      installment: ['', []],
      duplicateurl: ['', []],
      user: ['', []],
      password: ['', []],
      description: ['', []],
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
  }

}
