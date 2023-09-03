import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CollectDeliverValidators } from '../../validators/collect-deliver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPanelComponent } from './confirmation-panel/confirmation-panel.component';
import { TypePartnerEnumDto } from 'src/components/main/partner/dto/enums/type-partner-enum-dto';
import { CheckDto } from 'src/shared/components/check-button-g/dto/check-dto';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';


@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit {

  urlCustomer: string = 'customers/GetAllPagedCustomersAsync';
  urlPartner: string = 'partners/GetAllPagedPartnersAsync';

  errorsPanelHiddenShow: boolean = false;

  screenFieldPosition: string = 'row';

  constructor(
    private _cDCreateService: CollectDeliverCreateService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog
  ) { super(_breakpointObserver) }

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

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valLocal = CollectDeliverValidators;
  get validatorLocal() {
    return this.valLocal
  }


  removeValidatorsSetFormFieldsValueNull(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
      form.get(field).removeValidators(Validators.required);
      form.get(field).removeValidators(Validators.requiredTrue);
      form.get(field).updateValueAndValidity();
    })
  }

  SetFormFieldsValueNull(form: FormGroup, fields: string[]) {
    fields.forEach(field => {
      form.get(field).setValue(null);
    })
  }


  paymentShowHide: boolean = false;
  toPayment($event: any) {

      if (!$event.checked) {
        this.billingFromSubForm.setValue({
          customerId: null,
          partnerId: null,
          base: true,
        })
      }
    this.paymentShowHide = $event.checked;
  }

  mtdFormsControlsCleanRadioPayment() {
    this.selectedNameEntityToPay = '';
    this.selectedEntityTypeToPay = '';
    this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['partnerId']);
    this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['customerId']);
  }
  radiosEntitiesDic(value: string): IRadiosDictionary<string> {

    let entitiesPlace: IRadiosDictionary<string> =
      { "C,Não cadastrado": "others", "B,Parceiro": "partner", "A,Cliente": "customer" }

    let entitiesPayment: IRadiosDictionary<string> = { "B,Parceiro": "partner", "A,Cliente": "customer" }

    if (value === 'place')
      return entitiesPlace;

    if (value === 'payment')
      return entitiesPayment;

    return entitiesPlace;
  }

  selectedEntityTypeToGo: string = '';
  selectedNameEntityToGo: string = '';
  selectedNameEntityToPay: string = '';
  selectedEntityTypeToPay: string = '';

  selectedEntityToPay(selected: any) {
    switch (selected.type) {
      case 'customer':
        this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['partnerId']);
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'Cliente';
        this.billingFromSubForm.get('base').setValue(false)
        this.billingFromSubForm.get('customerId').setValue(`${selected.entity.id}`)
        break;
      case 'partner':
        this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['customerId']);
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'Parceiro';
        this.billingFromSubForm.get('base').setValue(false)
        this.billingFromSubForm.get('partnerId').setValue(`${selected.entity.id}`)
        break;
    }
  }



  mtdFormsControlsCleanRadioDestiny() {
    this.selectedEntityTypeToGo = '';
    this.selectedNameEntityToGo = '';

    this.SetFormFieldsValueNull(this.destinySubForm, ['partnerId', 'customerId', 'noRegisterName', 'noRegisterAddress']);

    this.formMain.get('collect').setValue(false);
    this.formMain.get('deliver').setValue(false);
    this.formMain.get('other').setValue(false);

  }


  outPutCollectTableCheckBox(selected: any) {

    if (selected.obj.hasOwnProperty('assured')) this.mtdSetFormDestinyCustomerId(selected.obj as CustomerDto, selected.status, 'collect')

    if (selected.obj.hasOwnProperty('businessLine')) this.mtdSetFormDestinyPartnerId(selected.obj as PartnerDto, selected.status, 'collect')

  }

  mtdSetFormDestinyCustomerId(entity: CustomerDto, status: boolean, field: string) {

    this.destinySubForm.get('customerId').setValue(entity.id);

    if (!status)
    this.destinySubForm.get('customerId').setValue(null);

    this.formMain.get(field).setValue(status)

    this.selectedEntityTypeToGo = 'Cliente';
    this.selectedNameEntityToGo = entity.name;

  }


  outPutDeliverTableCheckBox(selected: any) {

    if (selected.obj.hasOwnProperty('assured')) this.mtdSetFormDestinyCustomerId(selected.obj as CustomerDto, selected.status, 'deliver')

    if (selected.obj.hasOwnProperty('businessLine')) this.mtdSetFormDestinyPartnerId(selected.obj as PartnerDto, selected.status, 'deliver')
  }

  mtdSetFormDestinyPartnerId(entity: PartnerDto, status: boolean, field: string) {

    this.destinySubForm.get('partnerId').setValue(entity.id);

    if (!status)
    this.destinySubForm.get('partnerId').setValue(null);

    this.formMain.get(field).setValue(status);


    this.selectedEntityTypeToGo = 'Parceiro';
    this.selectedNameEntityToGo = entity.name;

  }


  openDialogConfirmationPanel(): void {

    const dialogRef = this._dialog.open(ConfirmationPanelComponent, {
      width: '800px',
      height: 'auto',
      data: {
        title: 'Tudo certo?',
        btn1: 'Sim, Salvar',
        btn2: 'Não, Editar',
        entity: this.formMain
      },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.split(',')[0] === 'Sim') {
        this.saveToBackEnd();
        console.log('teste')
      }
    })

  }

  cleanReloadAfterSave() {
    this.formMain.reset();
    this.formLoad();
    this.errorsPanelHiddenShow = false;
    this.selectedEntityTypeToGo = '';
    this.selectedNameEntityToGo = '';
    this.selectedEntityTypeToPay = '';
    this.selectedNameEntityToPay = '';
  }

  saveToBackEnd() {

    this._cDCreateService.save(this.formMain);
    this.paymentShowHide = false;
    this.cleanReloadAfterSave();
  }










  fomMainErrorValidationMessage: FormGroup;
  billingFromErrorValidationMessage: FormGroup;
  destinySubFormErrorValidationMessage: FormGroup;
  mtdfomMainErrorValidationMessage() {
    this.fomMainErrorValidationMessage = this._fb.group({
      transporterId: ['Transportador', []],
      subjectReason: ['Motivo', []],
      contactName: ['Contato no local', []],
      price: ['Valor', []],
      collect: ['Coleta', []],
      deliver: ['Entrega', []],
      other: ['Serviços', []],
      taskOverView: ['Descrição', []]
    })
  }
  mtdbillingFromErrorValidationMessage() {
    this.billingFromErrorValidationMessage = this._fb.group({
      customerId: ['Receber de cliente', []],
      partnerId: ['Receber de parceiro ', []],
      base: ['Custo da propria empresa', []],
    })
  }

  mtddestinySubFormErrorValidationMessage() {
    this.destinySubFormErrorValidationMessage = this._fb.group({
      customerId: ['Destino cliente', []],
      partnerId: ['Destino parceiro', []],
      noRegisterName: ['Destino não cadastrado', []],
      noRegisterAddress: ['Destino não cadastrado', []],
      collectDeliverId: ['', []]
    })
  }

  tableDestinyCustomer: boolean;
  tableDestinyPartner: boolean;
  tableDestinyOther: boolean;

  selectedRadioDestiny: string;
  radioDestiny($event: any) {

    this.mtdFormsControlsCleanRadioDestiny();

    switch ($event) {

      case 'customer':

        this.selectedRadioDestiny = $event;

        this.tableDestinyCustomer = true;
        this.tableDestinyPartner = false;
        this.tableDestinyOther = false;
        break;

      case 'partner':

        this.selectedRadioDestiny = $event;

        this.tableDestinyPartner = true;
        this.tableDestinyCustomer = false;
        this.tableDestinyOther = false;
        break;

      case 'others':
        this.selectedRadioDestiny = $event;

        this.tableDestinyOther = true;
        this.tableDestinyPartner = false;
        this.tableDestinyCustomer = false;

        break;
    }

  }

  tablePayment: boolean = true;
  selectedRadioPayment: string;
  radioPayment($event: any) {

    this.mtdFormsControlsCleanRadioPayment()

    switch ($event) {

      case 'customer':

        this.selectedRadioPayment = $event;
        this.tablePayment = true;
        break;

      case 'partner':

        this.selectedRadioPayment = $event;
        this.tablePayment = false;
        break;
    }

  }

  onChangeRadioDestiny($event: any) {
    if ($event === 'others') {
      this.validatorLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver', 'other']);
      this.validatorLocal.required(this.destinySubForm, 'noRegisterName');
      this.validatorLocal.required(this.destinySubForm, 'noRegisterAddress');

      this.removeValidatorsSetFormFieldsValueNull(this.destinySubForm, ['partnerId', 'customerId'])
    }

    if ($event !== 'others') {
      this.removeValidatorsSetFormFieldsValueNull(this.formMain, ['collect', 'deliver', 'other'])
    }










  }
  onChangeRadioPayment($event: any) {

    if ($event === 'customer') {
      this.validatorLocal.required(this.billingFromSubForm, 'customerId');
      this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['partnerId'])
    }

    if ($event === 'partner') {
      this.validatorLocal.required(this.billingFromSubForm, 'partnerId');
      this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['customerId'])
    }
  }

  RadioSelectedStart: string = 'customer';
  @ViewChild('matCheckbox') receive: MatCheckbox

  save() {

    this.RadioSelectedStart = 'customer';



    if (this.destinySubForm.get('customerId').value) {
      this.removeValidatorsSetFormFieldsValueNull(this.destinySubForm, ['partnerId', 'noRegisterName', 'noRegisterAddress']);

    }
    if (this.destinySubForm.get('partnerId').value) {
      this.removeValidatorsSetFormFieldsValueNull(this.destinySubForm, ['customerId', 'noRegisterName', 'noRegisterAddress']);
    }

    if (this.destinySubForm.get('noRegisterName').value && !this.destinySubForm.get('noRegisterAddress').value) {
      this.removeValidatorsSetFormFieldsValueNull(this.destinySubForm, ['customerId', 'partnerId']);
    }


    if (this.alertSave(this.formMain)) {
      this.openDialogConfirmationPanel();
      this.receive.checked = false;
    }
    else {
      this.errorsPanelHiddenShow = true;
    }


  }

  transportersToView: PartnerDto[];

  get transporters() {
    return this.transportersToView.filter(x => x.partnerType == TypePartnerEnumDto.transporter);
  }

  lengthCustomer: number;
  lengthPartner: number;
  billingFromSubForm: FormGroup;
  destinySubForm: FormGroup;

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      userId: [localStorage.getItem("userId"), [Validators.required]],
      transporterId: ['', [Validators.required]],
      subjectReason: ['', [Validators.required, Validators.maxLength(150)]],
      contactName: ['', [Validators.required, Validators.maxLength(50)]],

      price: [, [Validators.required]],
      collect: [false, []],
      deliver: [false, []],
      other: [false, []],
      taskOverView: ['', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.billingFromSubFormLoad(),
      destiny: this.destinySubFormLoad()
    })
  }


  destinySubFormLoad() {
    return this.destinySubForm = this._fb.group({
      customerId: [null, []],
      partnerId: [null, []],
      noRegisterName: [null, []],
      noRegisterAddress: [null, []],
      collectDeliverId: [0, []]
    })
  }

  billingFromSubFormLoad() {
    return this.billingFromSubForm = this._fb.group({
      partnerId: [null, []],
      customerId: [null, []],
      base: [true, []],
    })
  }



  ngOnInit(): void {

    this.tableDestinyPartner = false;
    this.tableDestinyCustomer = true;

    this._route.data.subscribe({
      next: (item: any) => {
        this.transportersToView = item.loaded['transporters'];
      }
    });

    this._route.data.subscribe({
      next: (item: any) => {
        this.lengthCustomer = item.loaded['customersLength'];
        this.lengthPartner = item.loaded['partnersLength'];
      }
    });

    this.formLoad();
    this.mtdfomMainErrorValidationMessage()
    this.mtdbillingFromErrorValidationMessage();
    this.mtddestinySubFormErrorValidationMessage();
    this.screen();

    this.validatorLocal.required(this.destinySubForm, 'partnerId');
    this.validatorLocal.required(this.destinySubForm, 'customerId');
    this.validatorLocal.required(this.destinySubForm, 'noRegisterName');
    this.validatorLocal.required(this.destinySubForm, 'noRegisterAddress');

  }

}
