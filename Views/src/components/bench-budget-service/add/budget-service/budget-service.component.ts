import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'app-budget-service',
  templateUrl: './budget-service.component.html',
  styleUrls: ['./budget-service.component.css']
})
export class BudgetServiceComponent extends BaseForm implements OnInit {

  constructor(private _fb: FormBuilder) { super() }



  mainFormLoad() {
    return this.formMain = this._fb.group
      ({
        companyId: [localStorage.getItem("companyId"), [Validators.required]],
        userId: [localStorage.getItem("userId"), [Validators.required]],
        customerId: ['', []],
        problemAccordingCustomer: ['', []],
        isPresentVisuallyDescription: ['', []],
        isRemote: ['', []],
        dataDescription: ['', []],
        entryDate: ['', []],
        budgetOpen: ['', []],
        service: this.serviceFormLoad(),
        collectsDeliversCosts: ['', []],
        statusService: []
      })
  }

  serviceFormLoad() {
    return this.subForm = this._fb.group
      ({
        userId: ['', []],
        executedServicesComments: ['', []],
        isAuthorized: ['', []],
        started: ['', []],
        finished: ['', []],
        prices: ['', []]
      })
  }



  ngOnInit(): void {
  }

}
