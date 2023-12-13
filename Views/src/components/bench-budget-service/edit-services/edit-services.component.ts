import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MatRadioButton } from '@angular/material/radio';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CostFrom } from '../dto/interfaces/i-cost-from';
import { StatusService } from '../dto/interfaces/i-status-service';
import { EditServicesService } from './services/edit-services.service';
import { BenchBudgetServiceValidators } from '../validators/bench-budget-service-validators';
import { TableProvidedServicesPricesDto } from '../dto/table-provided-services-prices-dto';
import { BudgetServiceDto } from '../dto/budget-service-dto';
import { PriceDto } from '../dto/price-dto';
import { CommonService } from '../commons-components/services/common.service';

@Component({
  selector: 'edit-services',
  templateUrl: './edit-services.component.html',
  styleUrls: ['./edit-services.component.css']
})
export class EditServicesComponent extends BaseForm implements OnInit {

  costs: CostFrom = new CostFrom();
  statusService: StatusService = new StatusService();
  companyId: string = JSON.parse(localStorage.getItem('companyId'));
  customerName: string;

  radioExecutionMode: { [key: string]: number } = { Remoto: 0, Presencial: 1, Misto: 2 }

  sort = () => {
    return 0
  }

  constructor(
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _commonService: CommonService,
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
  mainFormLoad(x: BudgetServiceDto) {

    this.customerName = x.customer.name;

    this.formMain = this._fb.group
      ({
        id: [x?.id, [Validators.required]],
        companyId: [x?.companyId, [Validators.required]],
        userId: [x?.userId, [Validators.required]],
        customerId: [x?.customerId, [Validators.required]],
        problemAccordingCustomer: [x?.problemAccordingCustomer, [Validators.required]],
        isPresentVisuallyDescription: [x?.isPresentVisuallyDescription, []],
        executionMode: [x?.executionMode, []],
        dataDescription: [x?.dataDescription, [Validators.maxLength(1000)]],
        service: this.formService = this._fb.group(
          {
            id: [x?.service?.id, []],
            userId: [x?.service?.userId, []],
            executedServicesComments: [x?.service?.executedServicesComments, []],
            isAuthorized: [x?.service?.isAuthorized, []],
            started: [x?.service?.started, []],
            finished: [x?.service?.finished, []],
            prices: this._fb.array([]),
          }

        ),
        collectsDeliversCosts: this.subForm = this._fb.group(
          {
            id: [x?.collectsDeliversCosts?.id, []],
            roundTrip: [x?.collectsDeliversCosts?.roundTrip, []],
            costFrom: [x?.collectsDeliversCosts?.costFrom, [Validators.required]],
            price: [x?.collectsDeliversCosts?.price, []],
          }
        ),
        statusService: [x.statusService, []]

      })

    this.formArrayPricesLoaded(x?.service?.prices);
  }

  formArrayPrices() {
    return this.formPrices = this._fb.group({
      id: [0, []],
      serviceName: ['', []],
      priceService: ['', []],
    })
  }

  formArrayPricesLoaded(x: PriceDto[]) {
    x?.forEach(xy => {
      this?.pricesArray?.push(this.formPrices = this._fb.group({
        id: [xy?.id, []],
        serviceName: [xy?.serviceName, []],
        priceService: [xy?.priceService, []],
      }))
    })
  }

  get pricesArray() {
    return this.formService?.get('prices') as FormArray;
  }

  addPrices() {
    this.pricesArray.push(this.formArrayPrices());
  }

  removePrices(index: number) {
    this.pricesArray.removeAt(index);
  }

  removeAllPrices() {
    this.pricesArray.clear()
  }

  showHideBtnAdd: boolean = false;
  authCheckbox($event: MatCheckbox) {

    const auth = $event;

    if (auth.checked) {
      this.formMain.get('service').get('isAuthorized').setValue(new Date());
      this.showHideBtnAdd = true;
    }

    if (!auth.checked) {
      this.removeAllPrices()
      this.showHideBtnAdd = false;
      this.formMain.get('service').get('started').setValue(null);
      this.formMain.get('service').get('finished').setValue(null);
      this.formMain.get('service').get('isAuthorized').setValue(null);

    }

  }

  executionMode(event: MatRadioButton) {

    const radio = event;

    this.formMain.get('executionMode').setValue(Number.parseInt(radio.value));

  }

  tableProvidedServicesPrices: TableProvidedServicesPricesDto[] = [];
  getTableOfServicePrices() {
    this._editService.loadById$<TableProvidedServicesPricesDto[]>('TableProvidedServicesPrices/GetAllAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe((x: TableProvidedServicesPricesDto[]) => {
        this.tableProvidedServicesPrices = x;
      })
  }

  tablePrices($event: string, index: string) {

    const serviceName = $event;
    const i = index;

    this.tableProvidedServicesPrices.forEach((x: TableProvidedServicesPricesDto) => {
      if (x.serviceName === serviceName)
        this.formMain.get('service').get('prices').get(i.toString()).get('priceService').setValue(x.priceService)
    })

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
      this.formMain.get('service').get('started').setValue(new Date());
      this.finishedHideShow = true;
      this.addPrices();
      this.formMain.get('statusService').setValue(2);
    }

    if (!started.checked) {
      this.formMain.get('service').get('started').setValue(null)
      this.formMain.get('service').get('finished').setValue(null)
      this.finishedHideShow = false;
      this.removeAllPrices();
      this.formMain.get('statusService').setValue(4)
    }
  }

  update() {
    const entity = this.formMain.value as BudgetServiceDto;

    if (this.alertSave(this.formMain)) {

      this._editService.update(this.formMain);
      this.mainFormLoad(entity);

    }

  }

  ngOnInit(): void {

    this.screen();

    this.getTableOfServicePrices();

    this?._actRoute?.data?.subscribe(x => {

      const entity = x['loaded'] as BudgetServiceDto;

      this.dataAccess = entity.dataDescription.length === 0 ? false : true;

      this.mainFormLoad(entity);

      this.subForm.patchValue(entity.collectsDeliversCosts)

    })

    if (this.formMain.get('service').get('finished').value != null)
      this.finishedHideShow = true

    if (this.pricesArray.length > 0)
      this.showHideBtnAdd = true;

  }

}
