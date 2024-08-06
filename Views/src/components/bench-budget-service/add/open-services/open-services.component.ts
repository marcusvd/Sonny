import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CommonFormService } from '../../commons-components/services/common-form.service';
import { BudgetServiceDto } from '../../dto/budget-service-dto';
import { CostFrom } from '../../dto/interfaces/i-cost-from';
import { StatusService } from '../../dto/interfaces/i-status-service';
import { TableProvidedServicesPricesDto } from '../../dto/table-provided-services-prices-dto';
import { BenchBudgetServiceValidators } from '../../validators/bench-budget-service-validators';
import { OpenServicesService } from './services/open-services.service';

@Component({
  selector: 'open-services',
  templateUrl: './open-services.component.html',
  styleUrls: ['./open-services.component.css']
})
export class OpenServicesComponent extends BaseForm implements OnInit {

  costs: CostFrom = new CostFrom();
  statusService: StatusService = new StatusService();

  customerName: string;

  constructor(
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _commonFormService: CommonFormService,
    private _openServicesService: OpenServicesService,
    override _breakpointObserver: BreakpointObserver,

  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
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

  dataAccessValidator = new BenchBudgetServiceValidators()

  screenFieldPosition: string = 'row';
  hideShowPaymentKind: boolean = false;
  dataAccess: boolean;

  addPrices(){
    this._commonFormService.addPrices();
  }

  removePrices(index: number) {
    this._commonFormService.removePrices(index);
  }
  get pricesArray(){
    return this._commonFormService.pricesArray
  }


  dataAccessShowHideInput($event: MatCheckbox) {
    const dataAccessCheckBox = $event;
    this.dataAccess = dataAccessCheckBox.checked;
  }

  showHideBtnAdd: boolean = false;
  authCheckbox($event: MatCheckbox) {

    const auth = $event;

    if (auth.checked) {
      this.formMain.get('service').get('isAuthorized').setValue(new Date());
      this.showHideBtnAdd = true;
    }

    if (!auth.checked) {
      this._commonFormService.removeAllPrices()
      this.showHideBtnAdd = false;
      // this.formMain.get('service').get('started').setValue(null);
      this.formMain.get('service').get('finished').setValue(null);
      this.formMain.get('service').get('isAuthorized').setValue(null);

    }

  }

  tableProvidedServicesPrices: TableProvidedServicesPricesDto[] = [];
  getTableOfServicePrices() {
    this._openServicesService.loadById$<TableProvidedServicesPricesDto[]>('TableProvidedServicesPrices/GetAllAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe((x: TableProvidedServicesPricesDto[]) => {
        this.tableProvidedServicesPrices = x;
      })
  }

  tablePrices($event: string, index: string) {

    const serviceName = $event;
    const i = index;

    // this.formMain.get('service').get('prices').get(i.toString()).get('serviceName').setValue(tablePrices.serviceName);
    this.tableProvidedServicesPrices.forEach((x: TableProvidedServicesPricesDto) => {
      if (x.serviceName === serviceName)
        this.formMain.get('service').get('repairs').get(i.toString()).get('priceService').setValue(x.priceService)
    })


    // console.log(tablePrices)

  }

  finished($event: MatCheckbox) {

    const finished = $event;

    if (finished.checked) {
      this.formMain.get('service').get('finished').setValue(new Date())
      this.formMain.get('statusService').setValue(5);
    }

    if (!finished.checked) {
      this.formMain.get('service').get('finished').setValue(null)
      this.formMain.get('statusService').setValue(2);
    }

  }

  finishedHideShow: boolean = false;
  started($event: MatCheckbox) {
    const started = $event;

    if (started.checked) {
      // this.formMain.get('service').get('started').setValue(new Date());
      this.finishedHideShow = true;
      this._commonFormService.addPrices();
      this.formMain.get('statusService').setValue(2);
    }

    if (!started.checked) {
      // this.formMain.get('service').get('started').setValue(null)
      this.formMain.get('service').get('finished').setValue(null)
      this.finishedHideShow = false;
      this._commonFormService.removeAllPrices();
      this.formMain.get('statusService').setValue(4)
    }
  }

  get btnSaveDisable() {
    if (this.formMain?.get('service')?.get('repairs')?.get('0')?.get('serviceName')?.value &&
      this.formMain?.get('service')?.get('isAuthorized')?.value)
      return true
    // this.formMain?.get('service')?.get('started')?.value)

    return false;
  }

  update() {

    const entity = this.formMain.value as BudgetServiceDto;

    if (this.alertSave(this.formMain)) {

      this._openServicesService.update(this.formMain);
      this._commonFormService.formLoad(entity);

    }

  }

  ngOnInit(): void {

    this.screen();

    this.getTableOfServicePrices();

    this?._actRoute?.data?.subscribe(x => {

      const entity = x['loaded'] as BudgetServiceDto;

      this.dataAccess = entity.dataDescription.length === 0 ? false : true;

      this.formMain = this._commonFormService.formLoad(entity);
      this._commonFormService.subForm = entity.collectsDeliversCosts;
      this.subForm =  this._commonFormService.formSub;

    })

    if (this.formMain.get('service').get('finished').value)
      this.finishedHideShow = true

    // if (this.formMain.get('service').get('finished').value != null || this.formMain.get('service').get('finished').value != undefined)
    //   this.finishedHideShow = true

    if (this._commonFormService.pricesArray.length > 0)
      this.showHideBtnAdd = true;

  }

}
