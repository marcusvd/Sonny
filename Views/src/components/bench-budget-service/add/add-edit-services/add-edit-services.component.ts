import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { PhysicallyMovingCostsDto } from 'src/components/main/inheritances/PhysicallyMovingCosts';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BudgetServiceDto } from '../../dto/budget-service-dto';
import { CostFrom } from '../../dto/interfaces/i-cost-from';
import { BenchBudgetServiceValidators } from '../../validators/bench-budget-service-validators';
import { AddEditService } from './services/add-edit.service';
import { TableProvidedServicesPricesDto } from '../../dto/table-provided-services-prices-dto';
import { StatusService } from '../../dto/interfaces/i-status-service';

@Component({
  selector: 'app-add-edit-services',
  templateUrl: './add-edit-services.component.html',
  styleUrls: ['./add-edit-services.component.css']
})
export class AddEditServicesComponent extends BaseForm implements OnInit {
  companyId: string = JSON.parse(localStorage.getItem('companyId'));
  customerName: string;
  constructor(
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _addEditService: AddEditService,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  dataAccessValidator = new BenchBudgetServiceValidators()

  // formLoad() {
  //   this.formMain = this._fb.group({
  //     customer: ['', []],
  //     problemAccordingCustomer: ['', []],
  //     isPresentVisuallyDescription: ['', []],
  //     isRemote: ['', []],
  //     dataDescription: ['', []],
  //     entryDate: ['', []],
  //     budgetOpen: ['', []],
  //     service: ['', []],
  //     collectsDeliversCosts: ['', []],
  //     statusService: ['', []]
  //   })
  // }

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

  physicallyMovingCostsDto: PhysicallyMovingCostsDto = new PhysicallyMovingCostsDto();
  urlCustomerWithTransporterCosts: string = 'customers/GetByIdAIcludedPhysicallyMovingCostsAsync';
  outSelectedEntity($event: any) {
    const selectedEntity = $event;
    this.formMain.get('customerId').setValue(selectedEntity.id);

    this._addEditService.loadByCompanyIdByEntity$<CustomerDto>(this.urlCustomerWithTransporterCosts, JSON.parse(localStorage.getItem('companyId')), selectedEntity.id)
      .subscribe((x: CustomerDto) => {
        this.physicallyMovingCostsDto = x.physicallyMovingCosts
      })
  }

  paymentKindSelect($event: MatSelect) {
    this.hideShowPaymentKind = false;
    const selectedData = $event;

    switch (selectedData.value) {
      case 0:
        if (!this.physicallyMovingCostsDto.fixedCostAssured) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.fixedCostAssured);
        }
        break;
      case 1:
        if (!this.physicallyMovingCostsDto.fuel) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.fuel);
        }
        break;
      case 2:
        if (!this.physicallyMovingCostsDto.apps) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.apps);
        }
        break;
      case 3:
        if (!this.physicallyMovingCostsDto.publicTransport) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.publicTransport);
        }
        break;
      case 4:
        if (!this.physicallyMovingCostsDto.motoBoy) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.motoBoy);
        }
        break;
      case 5:
        this.subForm.get('price').setValue(0);
        break;
      case 6:
        this.hideShowPaymentKind = true;
        this.subForm.get('price').setValue(0);
        break;
    }

  }

  formService: FormGroup;
  formPrices: FormGroup;
  mainFormLoad(x: BudgetServiceDto) {

    this.customerName = x.customer.name;

    return this.formMain = this._fb.group
      ({
        companyId: [x.companyId, [Validators.required]],
        userId: [x.userId, [Validators.required]],
        customerId: [x.customerId, [Validators.required]],
        problemAccordingCustomer: [x.problemAccordingCustomer, [Validators.required]],
        isPresentVisuallyDescription: [x.isPresentVisuallyDescription, []],
        isRemote: [x.isRemote, []],
        dataDescription: [x.dataDescription, [Validators.maxLength(1000)]],
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
            id: [x.collectsDeliversCosts.id, []],
            roundTrip: [x.collectsDeliversCosts.roundTrip, []],
            costFrom: [x.collectsDeliversCosts.costFrom, [Validators.required]],
            price: [x.collectsDeliversCosts.price, []],
          }
        ),
        statusService: [x.statusService, []]
      })
  }

  formArrayPrices() {
    return this.formPrices = this._fb.group({
      id: ['', []],
      serviceName: ['', []],
      priceService: ['', []],
    })
  }

  get pricesArray() {
    return this.formService.get('prices') as FormArray;
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

  TableProvidedServicesPrices: TableProvidedServicesPricesDto[] = [];
  getTableOfServicePrices() {
    this._addEditService.loadById$<TableProvidedServicesPricesDto[]>('TableProvidedServicesPrices/GetAllAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe((x: TableProvidedServicesPricesDto[]) => {
        this.TableProvidedServicesPrices = x;
      })
  }

  tablePrices($event: TableProvidedServicesPricesDto, index: string) {

    const tablePrices = $event;
    const i = index;

    this.formMain.get('service').get('prices').get(i.toString()).get('serviceName').setValue(tablePrices.serviceName);
    this.formMain.get('service').get('prices').get(i.toString()).get('priceService').setValue(tablePrices.priceService)


  }


  finished($event: MatCheckbox) {

    const finished = $event;

    if (finished.checked)
      this.formMain.get('service').get('finished').setValue(new Date())

    if (!finished.checked)
      this.formMain.get('service').get('finished').setValue(null)

  }

  finishedHideShow: boolean = false;
  started($event: MatCheckbox) {
    const started = $event;

    if (started.checked) {
      this.formMain.get('service').get('started').setValue(new Date());
      this.finishedHideShow = true;
      this.addPrices();
    }

    if (!started.checked) {
      this.formMain.get('service').get('started').setValue(null)
      this.formMain.get('service').get('finished').setValue(null)
      this.finishedHideShow = false;
      this.removeAllPrices();

    }
  }

  costs: CostFrom = new CostFrom();
  statusService: StatusService = new StatusService();
  ngOnInit(): void {

    this.screen();

    this.getTableOfServicePrices();

    this._actRoute.data.subscribe(x => {

      const entity = x['loaded'] as BudgetServiceDto;

      this.dataAccess = entity.dataDescription.length === 0 ? false : true;

      this.mainFormLoad(entity);

      this.subForm.patchValue(entity.collectsDeliversCosts)

    })

  }

}
