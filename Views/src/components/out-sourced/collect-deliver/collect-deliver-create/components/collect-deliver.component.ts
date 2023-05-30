import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CollectDeliver } from '../../validators/collect-deliver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { OtherFormService } from 'src/shared/components/other-form/other-form.service';


@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {
  title: string = "transfer_within_a_station";
  subTitle: string = 'Coleta / Entrega';

  allControls: string[] = ['customer', 'partner', 'noRegisterAddress', 'noRegisterName'];

  transporterLabelStyle: string = 'font-size:35px;';
  transporterLabelString: string = 'Transportador não cadastrado';

  startPriceTransporterCols: number;
  startPriceTransporterRowHeight: string = '120px'

  subjectCollectDeliverCols: number;
  subjectCollectDeliverRowHeight: string = '150px'

  itemsCollectedItemsDeliveredCols: number;
  itemsCollectedItemsDeliveredRowHeight: string = '250px'

  destinyChargeCols: number;
  destinyChargeRowHeight: string = '120px'

  transporter: boolean = false;

  constructor(
    private _cDCreateService: CollectDeliverCreateService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _otherFormService: OtherFormService,
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
            this.destinyChargeCols = 1;


            break;
          }
          case 'small': {
            // this.customerPartnerBaseOtherCols = 1;
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.transporterLabelStyle = 'font-size:20px;';
            this.destinyChargeCols = 1;
            break;
          }
          case 'medium': {
            // this.customerPartnerBaseOtherCols = 2;

            this.startPriceTransporterCols = 2;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:25px;';
            this.destinyChargeCols = 2;
            break;
          }
          case 'large': {
            // this.customerPartnerBaseOtherCols = 3;
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'font-size:35px;';
            this.destinyChargeCols = 2;
            break;
          }
          case 'xlarge': {
            // this.customerPartnerBaseOtherCols = 3;
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.transporterLabelStyle = 'ffont-size:35px;';
            this.destinyChargeCols = 2;
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

  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporterId').setValue(null);
    }

  }

  actualDate() {
    this.formMain.get('start').setValue(new Date());
  }


  chargeForm = new FormControl();
  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [localStorage.getItem("companyId"), []],
      subject: ['', [Validators.maxLength(137)]],
      ownerResponsible: ['', [Validators.required, Validators.maxLength(45)]],
      collect: [false, []],
      deliver: [false, []],
      chargeForm: this.subFormChargeFromLoad(),
      customer: ['', [Validators.required, Validators.maxLength(500)]],
      partner: ['', [Validators.required, Validators.maxLength(500)]],
      itemsCollected: ['', [Validators.maxLength(500)]],
      itemsDelivered: ['', [Validators.maxLength(500)]],
      comments: ['', [Validators.maxLength(500)]],
      start: ['', []],
      price: ['', []],
      transporterNoregisterd: ['', []],
      transporterId: ['', []],
      noRegisterName: ['', [Validators.required, Validators.maxLength(250)]],
      noRegisterAddress: ['', [Validators.required, Validators.maxLength(250)]],
    })

  }

  subFormChargeFromLoad() {
    return this.subForm = this._fb.group({
      customerId: ['', []],
      partnerId: ['', []],
      base: [true, []],
    }


    )
  }

  url: string = 'customers/GetAllPagedCustomersAsync';
  selectedRadio: string;

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

  chargeShoHide: boolean = false;
  toCharger($event: any) {
    if ($event.checked) {
      this.url = 'customers/GetAllPagedCustomersAsync';
      this.formMain.get('chargeForm').get('base').setValue(false);
    }

    if (!$event.checked)
      this.formMain.get('chargeForm').setValue({
        customerId: null,
        partnerId: null,
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


  get customerPartnerValidation() {
    if (
      this.formMain.controls['customer'].value
      ||
      this.formMain.controls['partner'].value
      ||
      this.formMain.controls['noRegisterName'].value
      &&
      this.formMain.controls['noRegisterAddress'].value
    )
      return '';

    return ("Selecione uma opção. Cliente, Parceiro ou 'Não cadastrado'. Destino é de preenchimento obrigatório. ")
  }
  get collectDeliverValidation() {
    if (this.formMain.controls['collect'].value
      ||
      this.formMain.controls['deliver'].value) {
      return ''

    } else {
      return 'selecione pelo menos uma opção, coleta/entrega ou ambas.'
    }


  }

  @ViewChild('stepper') private myStepper: MatStepper;
  nextStep(stepper: boolean) {
    if (stepper)
      this.myStepper.next();
  }
afterSaveRenew:string = 'customer';
selectedStep($event: any) {
  const selected = $event.selectedIndex;
  if (selected === 1) {
    this.afterSaveRenew = 'customer'
    // this.markAsCustomer = true;
    console.log('toGo')
  }
  if (selected === 4) {
    this.afterSaveRenew = 'customer'
    // this.markAsCustomer = true;
    console.log('to pay')
  }
}


typeEntityToDisplay(type: string) {
  if (type === 'customer') return 'cliente';

  if (type === 'partner') return 'parceiro';

  return 'cliente';
}



radioChose($event: any) {
  switch ($event) {
    case 'customer':

      this.selectedRadio = $event;
      this.hiddenTableShowForm($event);
      this.url = 'customers/GetAllPagedCustomersAsync'


      break;

    case 'partner':

      this.selectedRadio = $event;
      this.hiddenTableShowForm($event);
      this.url = 'partners/GetAllPagedPartnersAsync'

      break;

    case 'others':
      this.selectedRadio = $event;
      this.hiddenTableShowForm($event);
      this.url = null
      this.placeCleanEntity('partner', 'formMain');
      this.placeCleanEntity('customer', 'formMain');
      break;
  }
}

radiosEntitiesDic(value: string): IRadiosDictionary < string > {

  let entitiesPlace: IRadiosDictionary<string> =
    { "C,Não cadastrado": "others", "B,Parceiro": "partner", "A,Cliente": "customer" }

    let entitiesCharge: IRadiosDictionary<string> = { "B,Parceiro": "partner", "A,Cliente": "customer" }

    if(value === 'place')
return entitiesPlace;

if (value === 'charge')
  return entitiesCharge;

return entitiesPlace;
  }

selectedEntityTypeToGo: string = '';
selectedNameEntityToGo: any = null;
selectedEntityToGo(selected: any) {
  switch (selected.type) {
    case 'customer':

      this.placeSetEntity('customer', `${selected.entity.id}, ${selected.entity.name}`, 'togo');
      this.placeCleanEntity('partner', 'formMain');
      this.placeCleanEntity('noRegisterName', 'formMain');
      this.placeCleanEntity('noRegisterAddress', 'formMain');
      this.selectedNameEntityToGo = selected.entity.name;
      this.selectedEntityTypeToGo = this.typeEntityToDisplay('customer');

      break;
    case 'partner':

      this.placeSetEntity('partner', `${selected.entity.id}, ${selected.entity.name}`, 'togo');
      this.placeCleanEntity('customer', 'formMain');
      this.placeCleanEntity('noRegisterName', 'formMain');
      this.placeCleanEntity('noRegisterAddress', 'formMain');
      this.selectedNameEntityToGo = selected.entity.name;
      this.selectedEntityTypeToGo = this.typeEntityToDisplay('partner');

      break;
    case 'others':
      this.placeCleanEntity('partner', 'formMain');
      this.placeCleanEntity('customer', 'formMain');
      break;
  }

}

selectedNameEntity: any = null;
selectedEntityType: string = '';
selectedEntityToPay(selected: any) {
  switch (selected.type) {
    case 'customer':

      console.log(selected)

      this.placeCleanEntity('partnerId', 'subForm');
      this.selectedNameEntity = selected.entity.name;
      this.selectedEntityType = this.typeEntityToDisplay('customer');
      this.formMain.get('chargeForm').get('base').setValue(false)
      this.placeSetEntity('customerId', `${selected.entity.id}`, 'topay');

      // this.chargeForm = this.subForm.controls['customerId'] as FormControl;
      break;
    case 'partner':

      console.log(selected)
      this.placeCleanEntity('customerId', 'subForm');
      this.selectedNameEntity = selected.entity.name;
      this.selectedEntityType = this.typeEntityToDisplay('partner');
      this.formMain.get('chargeForm').get('base').setValue(false)

      this.placeSetEntity('partnerId', `${selected.entity.id}`, 'topay');
      // this.chargeForm = this.subForm.controls['partnerId'] as FormControl;
      break;

    // case 'others':

    //   this.placeCleanEntity('partnerId', 'subForm');
    //   this.placeCleanEntity('customerId', 'subForm');

    //   this.selectedNameEntity = selected.entity.name;
    //   this.selectedEntityType = this.typeEntityToDisplay('others');
    //   this.formMain.get('chargeForm').get('base').setValue(false)

    //   // this.chargeForm = this.subForm.controls['partnerId'] as FormControl;
    //   break;
  }

}

placeSetEntity(type: string, content: string, source: string) {

  if (source === 'togo')
    this?.formMain?.get(type)?.setValue(content);

  if (source === 'topay')
    this?.subForm?.get(type)?.setValue(content);

}
placeCleanEntity(type: string, form: string) {

  if (form === 'formMain') {
    this?.formMain?.get(type)?.setValue(null);
    this?.formMain?.get(type)?.removeValidators(Validators.required);
    this?.formMain?.get(type)?.updateValueAndValidity();

  }
  if (form === 'subForm')
    this?.subForm?.get(type)?.setValue(null);
  this?.subForm?.get(type)?.removeValidators(Validators.required);
  this?.subForm?.get(type)?.updateValueAndValidity();
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

  if (!this.formMain.get('chargeForm').get('base').value) {

    customer = this.formMain.get('chargeForm').get('customerId').value
    partner = this.formMain.get('chargeForm').get('partnerId').value
    if (!customer) {
      customer = null;
    }
    if (!partner) {
      partner = null;
    }

    this.formMain.get('chargeForm').get('customerId').setValue(customer);
    this.formMain.get('chargeForm').get('partnerId').setValue(partner);

  }
}

RadioSelectedStart: string = 'customer';
markAsCustomer: boolean = false;
errorsPanelHiddenShow: boolean = false;

save() {

  // if (this._otherFormService?.formMain?.get('noRegisterName').value
  //   ||
  //   this._otherFormService?.formMain?.get('noRegisterAddress').value) {
  //   this?.formMain?.get('noRegisterName').setValue(this._otherFormService?.formMain?.get('noRegisterName').value);
  //   this?.formMain?.get('noRegisterAddress').setValue(this._otherFormService?.formMain?.get('noRegisterAddress').value);
  // }

  this.RadioSelectedStart = 'customer';


  this.buildChargeForm();
  this.validators();


  this.valLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver']);

  if (this.alertSave(this.formMain)) {
    this._cDCreateService.save(this.formMain);
    console.log(this.formMain.value)
    this.cleanFields(this.formMain, this.allControls.concat(['subject', 'itemsCollected', 'itemsDelivered', 'comments']));
    this.cleanRadioGroupValue(this.formMain, this.allControls);
    this.formMain.reset();
    this.errorsPanelHiddenShow = false;
    this.selectedEntityTypeToGo = '';
    this.selectedNameEntityToGo = '';
    this.selectedEntityType = '';
    this.selectedNameEntity = '';
    this.formLoad();
  }
  else {
    this.errorsPanelHiddenShow = true;
  }

  this.markAsCustomer = true;
  this.afterSaveRenew = 'customer'
}

length: number;
transportersToView: PartnerDto[];
  get transporters() {
  return this.transportersToView.filter(x => x.transporter);
}

ngOnInit(): void {
  this._route.data.subscribe({
    next: (item: any) => {
      this.transportersToView = item.loaded['transporters'];
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

