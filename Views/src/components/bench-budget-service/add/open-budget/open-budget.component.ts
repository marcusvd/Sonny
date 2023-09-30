import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'open-budget',
  templateUrl: './open-budget.component.html',
  styleUrls: ['./open-budget.component.css']
})
export class OpenBudgetComponent extends BaseForm implements OnInit {
  listCustFrom:string[]=['Item1','Item2', 'Item3', 'Item4', 'Item5'];
  constructor(
    private _fb: FormBuilder,
    _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

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
        // entryDate: ['', []],
        budgetOpen: ['', []],
        collectsDeliversCosts: this.subFormLoad(),
        statusService: ['', []]
      })
  }
  subFormLoad() {
    return this.subForm = this._fb.group
      ({
        isHaveCost: ['', []],
        roundTrip: ['', []],
        costFrom: ['', []],
        // price: ['', []],
        apartPrice: ['', []],
      })
  }

  ngOnInit(): void {
    this.mainFormLoad();
  }

}
