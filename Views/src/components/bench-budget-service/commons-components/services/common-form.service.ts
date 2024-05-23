import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


import { PhysicallyMovingCostsDto } from 'src/components/main/inheritances/dtos/physically-moving-costs';
import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { BudgetServiceDto } from '../../dto/budget-service-dto';
import { CollectDeliverCostsDto } from '../../dto/collect-deliver-costs-dto';
import { RepairDto } from '../../dto/repair-dto';

@Injectable({
  providedIn: 'root'
})

export class CommonFormService extends BackEndService<PhysicallyMovingCostsDto> implements OnInit {

  constructor(
    override _http: HttpClient,
    private _fb: FormBuilder
  ) {
    super(_http, environment.backEndDoor)
  }

  private _formMain: FormGroup;
  private _subForm: FormGroup
  private _formService: FormGroup;
  private _formPrices: FormGroup;
  private _customerName: string;
  private _customerId: number;

  get customerName() {
    return this._customerName
  }
  get customerId() {
    return this._customerId
  }

  get formMain() {
    return this._formMain
  }

  set subForm(entity: CollectDeliverCostsDto) {
    this._subForm.patchValue(this._subForm);
  }

  get formSub() {
    return this._subForm
  }

  formLoad(x: BudgetServiceDto) {
    const minValue = '0001-01-01T00:00:00'

    this._customerName = x?.customer?.name;
    this._customerId =  x?.customer?.id;

    this._formMain = this._fb.group
      ({
        id: [x?.id, [Validators.required]],
        companyId: [x?.companyId, [Validators.required]],
        userId: [x?.userId, [Validators.required]],
        customerId: [x?.customerId, [Validators.required]],
        entryDate: [x?.entryDate, [Validators.required]],
        problemAccordingCustomer: [x?.problemAccordingCustomer, [Validators.required]],
        isPresentVisuallyDescription: [x?.isPresentVisuallyDescription, []],
        executionMode: [x?.executionMode, []],
        dataDescription: [x?.dataDescription, [Validators.maxLength(1000)]],
        service: this._formService = this._fb.group(
          {
            id: [x?.service?.id, []],
            userId: [localStorage.getItem("userId"), [Validators.required]],
            comments: [x?.service?.comments, []],
            isAuthorized: [x?.service?.isAuthorized, []],
            finished: [x?.service?.finished, []],
            repairs: this._fb.array([]),
          }

        ),
        collectsDeliversCosts: this._subForm = this._fb.group(
          {
            id: [x?.collectsDeliversCosts?.id, []],
            roundTrip: [x?.collectsDeliversCosts?.roundTrip, []],
            costFrom: [x?.collectsDeliversCosts?.costFrom, [Validators.required]],
            price: [x?.collectsDeliversCosts?.price, []],
          }
        ),
        statusService: [x.statusService, [Validators.required]]

      })

    this.formArrayPricesLoaded(x?.service?.repairs);

    return this._formMain
  }

  formArrayPrices() {
    return this._formPrices = this._fb.group({
      id: [0, []],
      serviceName: [null, []],
      priceService: [null, []],
      repairStatus: [4, []],
      executionMode: [0, []],
      added: [new Date(), []],
      executedServicesComments: ['', []],
    })
  }

  formArrayPricesLoaded(x: RepairDto[]) {
    x?.forEach(xy => {
      this?.pricesArray?.push(this._formPrices = this._fb.group({
        id: [xy?.id, []],
        serviceName: [xy?.serviceName, []],
        priceService: [xy?.priceService, []],
        repairStatus: [xy?.repairStatus, []],
        executionMode: [xy?.executionMode, []],
        added: [new Date(), []],
        executedServicesComments: ['', []],
      }))
    })
  }

  get pricesArray() {
    return this._formService?.get('repairs') as FormArray;
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

  ngOnInit(): void {

  }

}
