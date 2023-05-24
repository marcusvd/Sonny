import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CollectDeliver } from '../../validators/collect-deliver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { SearchType } from 'src/shared/services/get-all-search/search-type';
import { MatStepper } from '@angular/material/stepper';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { CollectDeliverDto } from '../dto/collect-deliver-dto';
import { OtherFormService } from 'src/shared/components/other-form/other-form.service';
import { ChargeFormDto } from '../dto/charge-form-dto';
import { CustomerDto } from 'src/components/customer/dto/customer-dto';
import { RadioButtonGComponent } from 'src/shared/components/radio-button-g/component/radio-button-g.component';


@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {
  title: string = "transfer_within_a_station";
  // title: string = 'Coleta';
  subTitle: string = 'Coleta / Entrega';
  allControls: string[] = ['customer', 'partner', 'noRegisterAddress', 'noRegisterName'];

  // indexSelectedStep: number = 0;

  transporterLabelStyle: string = 'font-size:35px;';
  transporterLabelString: string = 'Transportador não cadastrado';

  // customerPartnerBaseOtherCols: number;
  // customerPartnerBaseOtherRowHeight: string = '120px'

  startPriceTransporterCols: number;
  startPriceTransporterRowHeight: string = '120px'

  subjectCollectDeliverCols: number;
  subjectCollectDeliverRowHeight: string = '150px'

  itemsCollectedItemsDeliveredCols: number;
  itemsCollectedItemsDeliveredRowHeight: string = '250px'

  // customer: boolean;
  // partner: boolean;
  // other: boolean;
  // base: boolean;

  transporter: boolean = false;

  constructor(
    private _cDCreateService: CollectDeliverCreateService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _otherFormService: OtherFormService,
    // private _radioButtonGComponent: RadioButtonGComponent
  ) { super(_breakpointObserver) }


  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            // this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'small': {
            // this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.transporterLabelStyle = 'font-size:20px;';
            break;
          }
          case 'medium': {
            // this.customerPartnerBaseOtherCols = 2;

            this.startPriceTransporterCols = 2;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:25px;';
            break;
          }
          case 'large': {
            // this.customerPartnerBaseOtherCols = 3;
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:35px;';
            break;
          }
          case 'xlarge': {
            // this.customerPartnerBaseOtherCols = 3;
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

  // changeSelectedIndexStepSelection($event: number) {
  //   const index: number = $event;
  //   this.indexSelectedStep = index;
  //   console.log(this.indexSelectedStep)
  // }



  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporterId').setValue(null);
    }

  }

  actualDate() {
    this.formMain.get('start').setValue(new Date());
  }

  // place(value: string) {
  //   switch (value) {
  //     case 'customer':
  //       this.customer = value === "customer" ? true : false;
  //       this.partner = false;
  //       this.other = false;
  //       break;
  //     case 'partner':
  //       this.partner = value === "partner" ? true : false;
  //       this.customer = false;
  //       this.other = false;
  //       break;
  //     case 'base':
  //       this.customer = false;
  //       this.partner = false;
  //       this.other = false;
  //       break;
  //     case 'other':
  //       this.other = value === "other" ? true : false;
  //       this.customer = false;
  //       this.partner = false;
  //       break;
  //   }


  // }

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [localStorage.getItem("companyId"), []],
      subject: ['', [Validators.maxLength(137)]],
      ownerResponsible: ['', [Validators.maxLength(45)]],
      collect: [false, []],
      deliver: [false, []],
      chargeForm: this.subFormChargeFromLoad(),
      customer: ['', []],
      partner: ['', []],
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

  url: string = 'customers/GetAllPagedCustomersAsync';
  selectedRadio: string;
  // selectedRadio: string = 'customer';
  radioChose($event: any) {

    switch ($event) {
      case 'customer':
        this.selectedRadio = $event;
        console.log(this.selectedRadio);
        this.hiddenTableShowForm($event);
        this.url = 'customers/GetAllPagedCustomersAsync'
        // console.log($event)
        break;
      case 'partner':
        this.selectedRadio = $event;
        console.log(this.selectedRadio);
        this.hiddenTableShowForm($event);
        this.url = 'partners/GetAllPagedPartnersAsync'
        // console.log($event)
        // this.typeEntitySelected = 'partner';
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        // this.dataSource.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        // this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        break;
      case 'others':
        this.selectedRadio = $event;
        console.log(this.selectedRadio);
        this.hiddenTableShowForm($event);
        this.url = null
        this.placeCleanEntity('partner', 'formMain');
        this.placeCleanEntity('customer', 'formMain');
        // this.placeCleanEntity('noRegisterAddress', 'formMain');
        // this.placeCleanEntity('noRegisterAddress', 'formMain');
        // console.log($event)
        // this.typeEntitySelected = 'partner';
        // this.urlToChange = 'partners/GetAllPagedPartnersAsync';
        // this.dataSource.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
        // this.length = this.lengthPartner;
        // this.radioChoseOutput.emit($event);
        break;
    }
  }


  radioChoseOutput(selected: string) {
    this.hiddenTableShowForm(selected);
  }

  radiosEntitiesDic(value: string): IRadiosDictionary<string> {

    let entitiesPlace: IRadiosDictionary<string> =
      { "C,Não cadastrado": "others", "B,Parceiro": "partner", "A,Cliente": "customer" }

    let entitiesCharge: IRadiosDictionary<string> = { "B,Parceiro": "partner", "A,Cliente": "customer" }

    if (value === 'place')
      return entitiesPlace;

    if (value === 'charge')
      return entitiesCharge;

    return entitiesPlace;
  }


  hiddenTable: boolean = true;
  hiddenTableShowForm(selected: string) {
    if (selected === 'others') {
      this.hiddenTable = false;
    }
    else {
      this.hiddenTable = true;
    }
  }


  whoWillBeChargedControl: string = 'customerId';


  // chargeFromControlName(entity: SearchType[]) {

  //   // console.log(entity)

  //   if (entity[0].type == "partner") {
  //     // this.formDir.removeControl(this.controlDir);
  //     // // this.whoWillBeChargedControl
  //     // this.controlDir.name = this.whoWillBeChargedControl= 'partnerId';
  //     // this.formDir.addControl(this.controlDir);

  //     // this.subForm.get('-').setValue('');
  //     // this.subForm.get('partnerId').setValue(entity[0].id);
  //     //  this.subForm.get('customerId').setValue('');

  //   }
  //   if (entity[0].type == "customer") {
  //     // this.formDir.removeControl(this.controlDir);
  //     // // this.whoWillBeChargedControl
  //     // this.controlDir.name = this.whoWillBeChargedControl = 'customerId';
  //     // this.formDir.addControl(this.controlDir);
  //     // this.subForm.get('-').setValue('');
  //     // this.subForm.get('customerId').setValue(entity[0].id);
  //     // this.subForm.get('partnerId').setValue('');
  //   }
  //   // this.formMain.setControl('customerId', new FormControl('Test'));
  //   //     console.log(this.whoWillBeChargedControl)
  //   console.log(this.testtt)
  // }

  subFormChargeFromLoad() {
    return this.subForm = this._fb.group({
      // id: ['', []],
      customerId: ['', []],
      partnerId: ['', []],
      base: [true, []],
    }


    )
  }
  chargeShoHide: boolean = false;
  toCharger($event: any) {
    if ($event.checked) {
      this.url = 'customers/GetAllPagedCustomersAsync';
      this.formMain.get('chargeForm').get('base').setValue(false);
    }

    if (!$event.checked)
      this.formMain.get('chargeForm').setValue({
        customerId: 0,
        partnerId: 0,
        base: true,
      })



    this.chargeShoHide = $event.checked;
  }

  cleanFields(form: FormGroup, fields: string[]) {
    fields.map(x => {
      form.get(x).clearValidators();
      form.get(x).updateValueAndValidity();
    });
  }

  cleanRadioGroupValue(form: FormGroup, fields: string[]) {
    fields.map(x => this.formMain.get(x).reset());
  }



  // @ViewChild('partnerSource') partnerSource: MatRadioButton;
  // @ViewChild('customerSource') customerSource: MatRadioButton;
  // @ViewChild('baseSource') baseSource: MatRadioButton;
  // @ViewChild('otherSource') otherSource: MatRadioButton;

  // cleanRadioGroups() {
  //   if (this?.partnerSource?.checked) {
  //     this.partnerSource.checked = null;
  //   }
  //   if (this?.customerSource?.checked) {
  //     this.customerSource.checked = null;
  //   }
  //   if (this?.otherSource?.checked) {
  //     this.otherSource.checked = null;
  //   }

  // }

  @ViewChild('stepper') private myStepper: MatStepper;
  nextStep(stepper: boolean) {
    if (stepper)
      this.myStepper.next();
  }

  // selectedEntity(selected: any) {

  //   switch (selected.type){
  //   case 'customer':
  //     this.placeSetEntity('customer', `${selected.entity.id}, ${selected.entity.name}`);
  //     this.placeCleanEntity('partner');
  //     break;
  //   case 'partner':
  //     this.placeSetEntity('partner', `${selected.entity.id}, ${selected.entity.name}`);
  //     this.placeCleanEntity('customer');
  //     break;
  // }

  // }

  selectedEntityToGo(selected: any) {
    switch (selected.type) {
      case 'customer':
        this.placeSetEntity('customer', `${selected.entity.id}, ${selected.entity.name}`, 'togo');
        this.placeCleanEntity('partner', 'formMain');
        this.placeCleanEntity('noRegisterName', 'formMain');
        break;
      case 'partner':
        this.placeSetEntity('partner', `${selected.entity.id}, ${selected.entity.name}`, 'togo');
        this.placeCleanEntity('customer', 'formMain');
        this.placeCleanEntity('noRegisterName', 'formMain');
        break;
      case 'others':
        // this.placeCleanEntity('partner', 'formMain');
        // this.placeCleanEntity('customer', 'formMain');
        break;
    }

  }

  typeEntityToDisplay(type: string) {
    if (type === 'customer') return 'cliente';

    if (type === 'partner') return 'parceiro';

    return 'cliente';
  }

  selectedNameEntity: any = null;
  selectedEntityType: string = '';
  selectedEntityToPay(selected: any) {
    switch (selected.type) {
      case 'customer':
        console.log(selected)
        this.placeSetEntity('customerId', `${selected.entity.id}`, 'topay');
        this.placeCleanEntity('partnerId', 'subForm');
        // this.selectedNameEntity = selected.entity.name;
        // this.selectedEntityType = this.typeEntityToDisplay('customer');

        // this.formMain.get('chargeForm').get('base').setValue(false)

        break;
      case 'partner':
        this.placeSetEntity('partnerId', `${selected.entity.id}`, 'topay');
        this.placeCleanEntity('customerId', 'subForm');
        this.selectedNameEntity = selected.entity.name;
        this.selectedEntityType = this.typeEntityToDisplay('partner');

        this.formMain.get('chargeForm').get('base').setValue(false)
        break;
    }

  }


  placeSetEntity(type: string, content: string, source: string) {

    if (source === 'togo')
      this?.formMain?.get(type)?.setValue(content);

    if (source === 'topay')
      this?.subForm?.get(type)?.setValue(content);

  }
  placeCleanEntity(type: string, form: string) {

    if (form === 'formMain')
      this?.formMain?.get(type)?.setValue(null);

    if (form === 'subForm')
      this?.subForm?.get(type)?.setValue(null);

  }




  validators() {

    const ctrls: string[] = ['subject', 'start', 'price']
    ctrls.map(x => {
      this.formMain.get(x).setValidators(Validators.required)
      this.formMain.get(x).updateValueAndValidity();
    })
  }



  buildChargeForm() {
    let customer: number = 0;
    let partner: number = 0;
    // const charge: ChargeFormDto = new ChargeFormDto();

    if (!this.formMain.get('chargeForm').get('base').value) {

      customer = this.formMain.get('chargeForm').get('customerId').value
      partner = this.formMain.get('chargeForm').get('partnerId').value
      if (!customer) {
        customer = null;
      }
      if (!partner) {
        partner = null;
      }
      console.log(partner)
      console.log(customer)
      // charge.customer = customer;
      // charge.partner = partner;

      // console.log(charge.customer)
      // console.log(charge.partner)
      this.formMain.get('chargeForm').get('customerId').setValue(customer);
      this.formMain.get('chargeForm').get('partnerId').setValue(partner);

    }
  }


  RadioSelectedStart: string = 'customer';
  tttt: boolean = false;
  save() {

    if (this._otherFormService?.formMain?.get('noRegisterName').value
      ||
      this._otherFormService?.formMain?.get('noRegisterAddress').value) {
      this?.formMain?.get('noRegisterName').setValue(this._otherFormService?.formMain?.get('noRegisterName').value);
      this?.formMain?.get('noRegisterAddress').setValue(this._otherFormService?.formMain?.get('noRegisterAddress').value);
    }

    this.RadioSelectedStart = 'customer';


    this.buildChargeForm();
    this.validators();


    this.valLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver']);
    // console.log(this.formMain.value);

    if (this.alertSave(this.formMain)) {
      this._cDCreateService.save(this.formMain);
      this.cleanFields(this.formMain, this.allControls.concat(['subject', 'itemsCollected', 'itemsDelivered', 'comments']));
      this.cleanRadioGroupValue(this.formMain, this.allControls);
      this.formMain.reset();
      // this.cleanRadioGroups();
      this.formLoad();
    }

    this.tttt = true;
  }
  // }

  length: number;
  // lengthCustomers: number;
  // lengthPartners: number;
  transporters: PartnerDto[];

  ngOnInit(): void {
    this._route.data.subscribe({
      next: (item: any) => {
        this.transporters = item.loaded['transporters'];
      }
    });

    this.formLoad();
    this.screen();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.formMain.get('transporterId').setErrors({ required: true });
    }, 1);
  }

}

