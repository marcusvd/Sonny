import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CommonFormService } from '../commons-components/services/common-form.service';
import { CommonService } from '../commons-components/services/common.service';
import { BudgetServiceDto } from '../dto/budget-service-dto';
import { CostFrom } from '../dto/interfaces/i-cost-from';
import { StatusService } from '../dto/interfaces/i-status-service';
import { BenchBudgetServiceValidators } from '../validators/bench-budget-service-validators';
import { EditServicesService } from './services/edit-services.service';

@Component({
  selector: 'edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent extends BaseForm implements OnInit {

  costs: CostFrom = new CostFrom();
  statusService: StatusService = new StatusService();
  companyId: string = JSON.parse(localStorage.getItem('companyId'));

  radioExecutionMode: { [key: string]: number } = { Remoto: 0, Presencial: 1, Misto: 2 }

  sort = () => {
    return 0
  }

  constructor(
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _commonFormService: CommonFormService,
    private _editService: EditServicesService,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  dataAccessValidator = new BenchBudgetServiceValidators()

  screenFieldPosition: string = 'row';
  hideShowPaymentKind: boolean = false;
  dataAccess: boolean;

  dataAccessShowHideInput($event: MatCheckbox) {
    const dataAccessCheckBox = $event;
    this.dataAccess = dataAccessCheckBox.checked;
  }

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

  kindCostsMoving($event: MatSelect) {
    this.hideShowPaymentKind = false;
    const selectedData = $event;
    this.hideShowPaymentKind = this._commonService.switchPhysicallyMovingCosts(selectedData.value, this.subForm)

  }

  formService: FormGroup;
  formPrices: FormGroup;

  addPrices() {
    this._commonFormService.addPrices();
  }

  removePrices(index: number) {
    this._commonFormService.removePrices(index);
  }

  get pricesArray() {
    return this._commonFormService.pricesArray
  }

  executionMode(event: MatRadioButton) {

    const radio = event;

    this.formMain.get('executionMode').setValue(Number.parseInt(radio.value));

  }

  update() {

    const entity = this.formMain.value as BudgetServiceDto;

    if (this.alertSave(this.formMain)) {

      this._editService.update(this.formMain);
      this.formMain = this._commonFormService.formLoad(entity);

    }

  }

  customerName: string;
  customerId: number;
  minValueDate = '0001-01-01T00:00:00';
  finishedHideShow: boolean = false;
  ngOnInit(): void {

    this.screen();

    this?._actRoute?.data?.subscribe(x => {

      const entity = x['loaded'] as BudgetServiceDto;
      console.log(entity.customer)
      console.log(entity.customerId)
      this.dataAccess = entity.dataDescription.length === 0 ? false : true;
      this.formMain = this._commonFormService.formLoad(entity);
      this._commonFormService.subForm = entity.collectsDeliversCosts;
      this.subForm = this._commonFormService.formSub;

    })
    this.customerId = this._commonFormService.customerId
    this.customerName = this._commonFormService.customerName

  }

}
