import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from "@angular/common/http";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { CommonService } from "./services/common.service";
import { OpenBudgetService } from "../add/open-budget/services/open-budget.service";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { CostFrom } from "../dto/interfaces/i-cost-from";
import { MatSelect } from "@angular/material/select";
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'costs-moving',
  templateUrl: './costs-moving.component.html',
  styles: [`
  .costsTitle{
    font-weight:bolder;
    font-size: 22px;
  }
  .margin-divider-title{
    margin-top:10px;
  }
  `]
})
export class CostsMovingComponent extends BaseForm implements OnInit, OnChanges {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _commonService: CommonService,
  ) {
    super(_breakpointObserver)
  }


  @Input() customerId: string;
  ngOnChanges(changes: SimpleChanges): void {
    if (this.customerId)
      this._commonService.getCustomer(this.customerId);
  }

  @Input() override formMain: FormGroup;
  @Input() override subForm: FormGroup

  hideShowPaymentKind: boolean = false;
  costs: CostFrom = new CostFrom();
  screenFieldPosition: string = 'row';
  priceShow: number = 0;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  kindCostsMoving(event: MatSelect) {

    // this._commonService.getCustomer(this.formMain.get('customerId').value)

    const selectedData = event;

    if (this.subForm.get('costFrom').value === 4)
      this.hideShowPaymentKind = true;
    else
      this.hideShowPaymentKind = false;

    this._commonService.switchPhysicallyMovingCosts(selectedData.value, this.subForm)

  }


  roundTrip(event: MatCheckbox) {

    if (event)
      this.priceShow = this.subForm.get('price').value * 2;
    else
      this.priceShow = this.subForm.get('price').value
  }

  ngOnInit(): void {

    this.subForm.get('price').valueChanges.subscribe(x => {
      if (!this.subForm.get('roundTrip').value)
        this.priceShow = x
      else
        this.priceShow = x * 2
    })
  }

}
