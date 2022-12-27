import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { CompanyDto } from 'src/shared/dtos/company-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CollectDeliver } from '../../validators/collect-deliver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  allControls: string[] = ['customerId', 'partnerId', 'companyId', 'noRegisterAddress', 'noRegisterName'];

  indexSelectedStep: number = 0;

  transporterLabelStyle: string = 'font-size:35px;';
  transporterLabelString: string = 'Transportador não cadastrado';

  customerPartnerBaseOtherCols: number;
  customerPartnerBaseOtherRowHeight: string = '120px'

  startPriceTransporterCols: number;
  startPriceTransporterRowHeight: string = '120px'

  subjectCollectDeliverCols: number;
  subjectCollectDeliverRowHeight: string = '280px'

  itemsCollectedItemsDeliveredCols: number;
  itemsCollectedItemsDeliveredRowHeight: string = '250px'

  customer: boolean;
  partner: boolean;
  other: boolean;
  base: boolean;

  transporter: boolean = false;

  constructor(
    private _CDCreateService: CollectDeliverCreateService,
    private _ActRoute: ActivatedRoute,
    private _Fb: UntypedFormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  @ViewChild('partnerSource') partnerSource: MatRadioButton;
  @ViewChild('customerSource') customerSource: MatRadioButton;
  @ViewChild('baseSource') baseSource: MatRadioButton;
  @ViewChild('otherSource') otherSource: MatRadioButton;
  // @ViewChild('customerDestiny') customerDestiny: MatRadioButton;
  // @ViewChild('partnerDestiny') partnerDestiny: MatRadioButton;
  // @ViewChild('baseDestiny') baseDestiny: MatRadioButton;
  // @ViewChild('otherDestiny') otherDestiny: MatRadioButton;

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'small': {
            this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'medium': {
            this.customerPartnerBaseOtherCols = 2;

            this.startPriceTransporterCols = 2;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:25px;';
            break;
          }
          case 'large': {
            this.customerPartnerBaseOtherCols = 4;
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:35px;';
            break;
          }
          case 'xlarge': {
            this.customerPartnerBaseOtherCols = 4;
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
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

  private valLocal = CollectDeliver;
  get validatorLocal() {
    return this.valLocal
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
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


  place(value: string) {
    switch (value) {
      case 'customer':
        this.customer = value === "customer" ? true : false;
        this.partner = false;
        this.other = false;
        this.base = false;
        break;
      case 'partner':
        this.partner = value === "partner" ? true : false;
        this.customer = false;
        this.other = false;
        this.base = false;
        break;
      case 'base':
        this.base = value === "base" ? true : false;
        this.customer = false;
        this.partner = false;
        this.other = false;
        break;
      case 'other':
        this.other = value === "other" ? true : false;
        this.customer = false;
        this.partner = false;
        this.base = false;
        break;
    }


  }


  // formLoad() {
  //       //tests
  //   return this.formMain = this._Fb.group({
  //     subject: ['', []],
  //     collect: [false, []],
  //     deliver: [false, []],
  //     customerId: ['', []],
  //     partnerId: ['', []],
  //     companyId: ['', []],
  //     itemsCollected: ['',[]],
  //     itemsDelivered: ['',[]],
  //     comments: ['',[]],
  //     start: ['', []],
  //     price: ['', []],
  //     transporterNoregisterd: ['', []],
  //     transporterId: ['', []],
  //     noRegisterName: ['', []],
  //     noRegisterAddress: ['', []],

  //   })

  // }


  formLoad() {
    return this.formMain = this._Fb.group({
      subject: ['', [Validators.maxLength(70)]],
      collect: [false, []],
      deliver: [false, []],
      customerId: ['', []],
      partnerId: ['', []],
      companyId: ['', []],
      itemsCollected: ['', [Validators.maxLength(500)]],
      itemsDelivered: ['', [Validators.maxLength(500)]],
      comments: ['', [Validators.maxLength(500)]],
      start: ['', []],
      price: ['', []],
      transporterNoregisterd: ['', []],
      transporterId: ['', []],
      noRegisterName: ['', [Validators.maxLength(250)]],
      noRegisterAddress: ['', [Validators.maxLength(250)]],

    })

  }

  get customers(): CustomerDto[] {
    return this._CDCreateService.cli;
  }

  get partners(): PartnerDto[] {
    return this._CDCreateService.par;
  }
  get transporters(): PartnerDto[] {
    return this._CDCreateService.par.filter(x => x.transporter);
  }

  get companies(): CompanyDto[] {
    return this._CDCreateService.com;
  }

  cleanFields(form: UntypedFormGroup, fields: string[]) {
    fields.map(x => {
      form.get(x).clearValidators();
      form.get(x).updateValueAndValidity();
    });
  }
  cleanRadioGroupValue(form: UntypedFormGroup, fields: string[]) {
    fields.map(x => this.formMain.get(x).reset());
  }

  cleanRadioGroups() {
    if (this?.partnerSource?.checked) {
      this.partnerSource.checked = null;
    }
    if (this?.customerSource?.checked) {
      this.customerSource.checked = null;
    }
    if (this?.baseSource?.checked) {
      this.baseSource.checked = null;
    }
    if (this?.otherSource?.checked) {
      this.otherSource.checked = null;
    }

  }

  validators() {

    const ctrls: string[] = ['subject', 'start', 'price']
    ctrls.map(x => {
      this.formMain.get(x).setValidators(Validators.required)
      this.formMain.get(x).updateValueAndValidity();
    })
  }

  // save() {
  //   this._CDCreateService.save(this.formMain);
  // }
  save() {
    this.validators();
    this.valLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver']);
    if (this.alertSave(this.formMain)) {
      this._CDCreateService.save(this.formMain);
      this.cleanFields(this.formMain, this.allControls.concat(['subject', 'itemsCollected', 'itemsDelivered', 'comments']));
      this.cleanRadioGroupValue(this.formMain, this.allControls);
      this.formMain.reset();
      this.cleanRadioGroups();
      this.formLoad();
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

