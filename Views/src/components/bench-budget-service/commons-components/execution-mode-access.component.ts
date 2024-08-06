import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { ActivatedRoute } from "@angular/router";


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from "src/shared/helpers/validators/validators-messages";
import { BudgetServiceDto } from "../dto/budget-service-dto";
import { BenchBudgetServiceValidators } from "../validators/bench-budget-service-validators";

@Component({
  selector: 'execution-mode-access',
  templateUrl: './execution-mode-access.component.html',
  styles: [`
   .executionModeTitle{
    font-weight:bolder;
    font-size: 22px;
  }
  .margin-divider-title{
    margin-top:10px;
  }
  `]
})
export class ExecutionModeAccessComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _actRoute: ActivatedRoute,
  ) {
    super(_breakpointObserver)
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  @Input() override formMain: FormGroup;
  screenFieldPosition: string = 'row';

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

  radioExecutionMode: { [key: string]: number } = { Remoto: 0, Presencial: 1, Laboratório: 2 }
  sort = () => {
    return 0
  }

  dataAccessValidator = new BenchBudgetServiceValidators()
  dataAccess: boolean;

  dataAccessShowHideInput($event: MatCheckbox) {
    const dataAccessCheckBox = $event;
    this.dataAccess = dataAccessCheckBox.checked;
  }

  ngOnInit(): void {
    this?._actRoute?.data?.subscribe(x => {

      const entity = x['loaded'] as BudgetServiceDto;
      this.dataAccess = entity?.dataDescription?.length === 0 ? false : true;

    })
  }

}
