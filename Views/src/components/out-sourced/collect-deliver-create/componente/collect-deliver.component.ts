import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Window } from 'selenium-webdriver';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';
import { CompanyDto } from 'src/shared/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCollectDeliver } from 'src/shared/helpers/validators/collect-delivery/validators-collect-deliver';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PartnerDto } from '../../../partner/dto/partner-dto';
import { CollectDeliverCreateResolver } from '../resolver/collect-deliver.resolver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  private _radioValue: string;
  private _radioValueDestinyType: string;

  allControls: string[] = ['sourceCustomerId', 'sourcePartnerId',
    'sourceCompanyId', 'sourceNoRegisterName',
    'sourceNoRegisterAddress',
    'destinyCustomerId', 'destinyPartnerId', 'destinyCompanyId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'
  ];

  indexSelectedStep: number = 0;

  transporterLabelStyle: string = 'font-size:35px;';
  transporterLabelString: string = 'Transportador não cadastrado';

  customerPartnerBaseOtherCols: number;
  customerPartnerBaseOtherRowHeight: string = '120px'

  startPriceTransporterCols: number;
  startPriceTransporterRowHeight: string = '120px'

  destinyCustomers: boolean;
  destinyPartners: boolean;
  destinyOthers: boolean;
  destinyBase: boolean;

  sourceCustomers: boolean;
  sourcePartners: boolean;
  sourceOthers: boolean;
  sourceBase: boolean;

  transporter: boolean = false;

  constructor(
    private _CDCreateService: CollectDeliverCreateService,
    private _ActRoute: ActivatedRoute,
    private _Fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'small': {
            this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'medium': {
            this.customerPartnerBaseOtherCols = 2;

            this.startPriceTransporterCols = 2
            this.transporterLabelStyle = 'font-size:25px;';
            break;
          }
          case 'large': {
            this.customerPartnerBaseOtherCols = 4;
            this.startPriceTransporterCols = 3
            this.transporterLabelStyle = 'font-size:35px;';
            break;
          }
          case 'xlarge': {
            this.customerPartnerBaseOtherCols = 4;
            this.startPriceTransporterCols = 3
            this.transporterLabelStyle = 'ffont-size:35px;';
            break;
          }
        }
      }
    })




  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valLocal = ValidatorsCollectDeliver;
  get validatorLocal() {
    return this.valLocal
  }

  changeSelectedIndexStepSelection($event: number) {
    const index: number = $event;
    this.indexSelectedStep = index;
    console.log(this.indexSelectedStep)
  }

  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporterId').setValue(null);
    }

  }

  source(value: string) {
    switch (value) {
      case 'customer':
        this.sourceCustomers = value === "customer" ? true : false;
        this.sourcePartners = false;
        this.sourceOthers = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'customer';
        break;
      case 'partner':
        this.sourcePartners = value === "partner" ? true : false;
        this.sourceCustomers = false;
        this.sourceOthers = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'partner';
        break;
      case 'base':
        this.sourceBase = value === "base" ? true : false;
        this.sourceCustomers = false;
        this.sourcePartners = false;
        this.sourceOthers = false;
        this._CDCreateService.setFormSource = 'base';
        break;
      case 'other':
        this.sourceOthers = value === "other" ? true : false;
        this.sourceCustomers = false;
        this.sourcePartners = false;
        this.sourceBase = false;
        this._CDCreateService.setFormSource = 'other';
        break;
    }


  }

  destiny(value: string) {
    switch (value) {
      case 'customer':
        this.destinyCustomers = value === "customer" ? true : false;
        this.destinyPartners = false;
        this.destinyOthers = false;
        this.destinyBase = false;
        this._CDCreateService.setFormDestiny = 'customer';
        break;
      case 'partner':
        this.destinyPartners = value === "partner" ? true : false;
        this.destinyCustomers = false;
        this.destinyOthers = false;
        this.destinyBase = false;
        this._CDCreateService.setFormDestiny = 'partner';
        break;
      case 'base':
        this.destinyBase = value === "base" ? true : false;
        this.destinyCustomers = false;
        this.destinyPartners = false;
        this.destinyOthers = false;
        this._CDCreateService.setFormDestiny = 'base';
        break;
      case 'other':
        this.destinyOthers = value === "other" ? true : false;
        this.destinyCustomers = false;
        this.destinyPartners = false;
        this.destinyBase = false;
        this._CDCreateService.setFormDestiny = 'other';
        break;

    }
  }

  formLoad() {
    return this.formMain = this._Fb.group({
      subject: ['', [Validators.required, Validators.maxLength(70)]],
      transporterId: ['', []],
      transporterNoregisterd: ['', []],

      sourceCustomerId: [null, []],
      sourcePartnerId: [null, []],
      sourceCompanyId: [null, []],
      sourceNoRegisterName: [null, [Validators.maxLength(50)]],
      sourceNoRegisterAddress: [null, [Validators.maxLength(250)]],

      destinyCustomerId: [null, []],
      destinyPartnerId: [null, []],
      destinyCompanyId: [null, []],
      destinyNoRegisterName: [null, [Validators.maxLength(50)]],
      destinyNoRegisterAddress: [null, [Validators.maxLength(250)]],

      start: ['', [Validators.required]],
      price: ['', [Validators.required]],
      items: ['', [Validators.required, Validators.maxLength(500)]],
      comments: ['', [Validators.maxLength(500)]],
    })
  }

  get customers(): CustomerDto[] {
    return this._CDCreateService.cli;
  }

  get partners(): PartnerDto[] {
    return this._CDCreateService.par;
  }

  get companies(): CompanyDto[] {
    return this._CDCreateService.com;
  }

  save() {



    if (this.alertSave(this.formMain)) {
      this._CDCreateService.save(this.formMain);
      this.formLoad();
      this.formMain.reset();
    }

  }


  ngOnInit(): void {
    this._ActRoute.data.subscribe({
      next: (item: any) => {
        this._CDCreateService.cli = <CustomerDto[]>item.loaded['customers'];
        this._CDCreateService.par = <PartnerDto[]>item.loaded['partners'];
        this._CDCreateService.com = <CompanyDto[]>item.loaded['companies'];
      }
    });

    this.formLoad();
    this.screen();
  }
  ngAfterViewInit(): void {
    // this.validatorLocal.checkBoxTranporter(this.formMain, false, ['transporterNoregisterd'], ['transporterId'])
    setTimeout(() => {
      this.formMain.get('transporterId').setErrors({ required: true });
    }, 1);
  }

}

