import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component,  OnInit, ViewChild } from '@angular/core';
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

  url: string = 'customers/GetAllPagedCustomersAsync';


  trans() {
    this.transporter = !this.transporter;
    if (this.transporter) {
      this.formMain.get('transporterId').setValue(null);
    }

  }

  actualDate() {
    this.formMain.get('start').setValue(new Date());
    console.log(Date())
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
      chargeFrom: this.subFormChargeFromLoad(),
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


  whoWillBeChargedControl: string = 'customerId';
  testtt: string = 'customerId';

  chargeFromControlName(entity: SearchType[]) {

    // console.log(entity)

    if (entity[0].type == "partner") {
      // this.formDir.removeControl(this.controlDir);
      // // this.whoWillBeChargedControl
      // this.controlDir.name = this.whoWillBeChargedControl= 'partnerId';
      // this.formDir.addControl(this.controlDir);

      // this.subForm.get('-').setValue('');
      // this.subForm.get('partnerId').setValue(entity[0].id);
      //  this.subForm.get('customerId').setValue('');

    }
    if (entity[0].type == "customer") {
      // this.formDir.removeControl(this.controlDir);
      // // this.whoWillBeChargedControl
      // this.controlDir.name = this.whoWillBeChargedControl = 'customerId';
      // this.formDir.addControl(this.controlDir);
      // this.subForm.get('-').setValue('');
      // this.subForm.get('customerId').setValue(entity[0].id);
      // this.subForm.get('partnerId').setValue('');
    }
    // this.formMain.setControl('customerId', new FormControl('Test'));
    //     console.log(this.whoWillBeChargedControl)
    console.log(this.testtt)
  }

  subFormChargeFromLoad() {
    return this.subForm = this._fb.group({
      id: ['', []],
      chargeFrom: ['', []],
      base: [false, []],
      comments: ['', []],
    }


    )
  }

  chargeShoHide: boolean = false;
  toCharger($event: any) {
    this.chargeShoHide = $event.checked
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
    console.log(stepper)
      this.myStepper.next();
  }

  selectedEntity(selected: any) {

    switch (selected.type){
    case 'customer':
      this.placeSetEntity('customer', `${selected.entity.id}, ${selected.entity.name}`);
      this.placeCleanEntity('partner');
      break;
    case 'partner':
      this.placeSetEntity('partner', `${selected.entity.id}, ${selected.entity.name}`);
      this.placeCleanEntity('customer');
      break;
  }

  }

placeSetEntity(type:string, content:string){

  this.formMain.get(type).setValue(content);

}
placeCleanEntity(type:string){

  this.formMain.get(type).setValue(null);

}



  validators() {

    const ctrls: string[] = ['subject', 'start', 'price']
    ctrls.map(x => {
      this.formMain.get(x).setValidators(Validators.required)
      this.formMain.get(x).updateValueAndValidity();
    })
  }

  // radiosEntities(): IRadios[] {
  //   let entities: IRadios[] = [
  //     { displayName: "Cliente", codeName: "customer", checked: true },
  //     { displayName: "Parceiro", codeName: "partner", checked: false }
  //   ]
  //   return entities;
  // }
  // radiosEntitiesDic(): IRadiosDictionary<string> {
  //   let entities: IRadiosDictionary<string> =
  //     { "Cliente": "customer", "Parceiro": "partner" }

  //   return entities;
  // }



  save() {
    // console.log(this.formMain.value as CollectDeliverDto)
    this.validators();
    this.valLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver']);
    if (this.alertSave(this.formMain)) {
      this._cDCreateService.save(this.formMain);
      this.cleanFields(this.formMain, this.allControls.concat(['subject', 'itemsCollected', 'itemsDelivered', 'comments']));
      this.cleanRadioGroupValue(this.formMain, this.allControls);
      this.formMain.reset();
      // this.cleanRadioGroups();
      this.formLoad();
    }
  }

  length: number;
  lengthCustomers: number;
  lengthPartners: number;
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

