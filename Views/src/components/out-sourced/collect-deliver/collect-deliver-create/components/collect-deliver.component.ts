import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';


import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CollectDeliverValidators } from '../../validators/collect-deliver-validators';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPanelComponent } from './confirmation-panel/confirmation-panel.component';
import { TypePartnerEnumDto } from 'src/components/main/partner/dto/enums/type-partner-enum-dto';
import { CheckDto } from 'src/shared/components/check-button-g/dto/check-dto';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { CollectDeliverFormHandle } from '../../helpers/collect-deliver-form-handle';


@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit {

  //only html
  urlCustomer: string = 'customers/GetAllCustomersPagedAsync';
  urlPartner: string = 'partners/GetAllPagedPartnersAsync';
  radiosEntitiesDicDestiny = new CollectDeliverFormHandle().radiosEntitiesDic('entitiesPlace')
  radiosEntitiesDicPayment = new CollectDeliverFormHandle().radiosEntitiesDic('payment')
  clearCheckboxes: boolean = false;
  htmlValidation = new CollectDeliverFormHandle().validatorLocal;
  htmlvalidatorMessages = new CollectDeliverFormHandle().validatorMessages;


  //receive onInit to show Html
  markAsCustomerAfterSave: string = 'customer';
  transportersToView: PartnerDto[];
  get transporters() {
    return this.transportersToView.filter(x => x.partnerType == TypePartnerEnumDto.transporter);
  }

  transporterName: string = '';
  getNameTransporter(id: number) {

    const nameTransporter = this.transporters.find(x => x.id == id)
    this.transporterName = nameTransporter.name;

  }

  //two places cleanReloadAfterSave() and save()
  errorsPanelHiddenShow: boolean = false;

  //multiples places
  selectedEntityTypeToGo: string = '';
  selectedNameEntityToGo: string = '';
  selectedNameEntityToPay: string = '';
  selectedEntityTypeToPay: string = '';


  fomMainErrorValidationMessage: FormGroup;
  billingFromFormErrorValidationMessage: FormGroup;
  destinySubFormErrorValidationMessage: FormGroup;

  loadformsFake() {
    this.fomMainErrorValidationMessage = new CollectDeliverFormHandle(this._fb).mtdfomMainErrorValidationMessage();
    this.billingFromFormErrorValidationMessage = new CollectDeliverFormHandle(this._fb).mtdbillingFromFormErrorValidationMessage()
    this.destinySubFormErrorValidationMessage = new CollectDeliverFormHandle(this._fb).mtddestinySubFormErrorValidationMessage();
  }

  constructor(
    private _cDCreateService: CollectDeliverCreateService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog
  ) { super(_breakpointObserver) }


  screenFieldPosition: string = 'row';
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


  selectedEntityToPay(selected: any) {

    const selectedEntity = selected;

    if (selectedEntity.type === 'customer') {
      new CollectDeliverFormHandle().selectedEntityToPayHandle(this.billingFromSubForm, selectedEntity)
      this.selectedNameEntityToPay = selected.entity.name;
      this.selectedEntityTypeToPay = 'Cliente';
    }

    if (selectedEntity.type === 'partner') {
      new CollectDeliverFormHandle().selectedEntityToPayHandle(this.billingFromSubForm, selectedEntity)
      this.selectedNameEntityToPay = selected.entity.name;
      this.selectedEntityTypeToPay = 'Parceiro';
    }

  }

  outPutCollectTableCheckBox(selected: any) {

    new CollectDeliverFormHandle().mtdSetFormDestinyHandle([this.destinySubForm, this.formMain], selected, selected.status, 'collect')

    if (selected.obj.hasOwnProperty('assured')) {
      this.selectedEntityTypeToGo = 'Cliente';
      this.selectedNameEntityToGo = selected.obj.name;

      if (!selected.status) {
        this.selectedEntityTypeToGo = '';
        this.selectedNameEntityToGo = '';
      }

    }


    if (selected.obj.hasOwnProperty('businessLine')) {
      this.selectedEntityTypeToGo = 'Parceiro';
      this.selectedNameEntityToGo = selected.obj.name;

      if (!selected.status) {
        this.selectedEntityTypeToGo = '';
        this.selectedNameEntityToGo = '';
      }
    }
  }

  outPutDeliverTableCheckBox(selected: any) {

    new CollectDeliverFormHandle().mtdSetFormDestinyHandle([this.destinySubForm, this.formMain], selected, selected.status, 'deliver')

    if (selected.obj.hasOwnProperty('assured')) {
      this.selectedEntityTypeToGo = 'Cliente';
      this.selectedNameEntityToGo = selected.obj.name;

      if (!selected.status) {
        this.selectedEntityTypeToGo = '';
        this.selectedNameEntityToGo = '';
      }
    }

    if (selected.obj.hasOwnProperty('businessLine')) {
      this.selectedEntityTypeToGo = 'Parceiro';
      this.selectedNameEntityToGo = selected.obj.name;

      if (!selected.status) {
        this.selectedEntityTypeToGo = '';
        this.selectedNameEntityToGo = '';
      }
    }

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

        this.markAsCustomerAfterSave = 'customer';
        this.tableDestinyOther = true;
        this.tableDestinyPartner = false;
        this.tableDestinyCustomer = false;

        break;
    }

  }

  mtdFormsControlsCleanRadioDestiny() {

    this.selectedEntityTypeToGo = '';
    this.selectedNameEntityToGo = '';

    new CollectDeliverFormHandle().mtdFormsControlsCleanRadioDestinyHandle([this.destinySubForm, this.formMain])

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

  mtdFormsControlsCleanRadioPayment() {
    this.selectedNameEntityToPay = '';
    this.selectedEntityTypeToPay = '';

    this.removeValidatorsSetFormFieldsValueNull(this.billingFromSubForm, ['partnerId', 'customerId']);

  }

  onChangeRadioDestiny($event: any) {

    const choice = $event;
    new CollectDeliverFormHandle().onChangeRadioDestinyHandle([this.formMain, this.destinySubForm], choice)

  }

  onChangeRadioPayment($event: any) {

    const choice = $event;

    new CollectDeliverFormHandle().onChangeRadioPaymentHandle([this.billingFromSubForm], choice)

  }

  RadioSelectedStart: string = 'customer';
  @ViewChild('matCheckbox') receive: MatCheckbox

  save() {
    //only when happening a test.
    // this.openDialogConfirmationPanel();
    new CollectDeliverFormHandle().validationDestinyWhenSaiving(this.destinySubForm);

    if (this.alertSave(this.formMain)) {
      this.openDialogConfirmationPanel();
      this.receive.checked = false;
      this.clearCheckboxes = true;
      this.RadioSelectedStart = 'customer';
    }
    else {
      this.errorsPanelHiddenShow = true;

    }


  }

  openDialogConfirmationPanel(): void {

    const dialogRef = this._dialog.open(ConfirmationPanelComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        title: 'Tudo certo?',
        btn1: 'Sim, Salvar',
        btn2: 'Não, Editar',
        // entity: new CollectDeliverFormHandle().test()
        entity: new CollectDeliverFormHandle().formToShowConfirmationPanel
          (this.formMain, this.selectedNameEntityToGo, this.selectedNameEntityToPay, this.transporterName)
      },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.split(',')[0] === 'Sim') {
        this.saveToBackEnd();
      }
    })

  }

  saveToBackEnd() {
    console.log(this.formMain.value, 'AFTER')
    this._cDCreateService.save(this.formMain);
    this.paymentShowHide = false;
    this.cleanReloadAfterSave();
  }

  cleanReloadAfterSave() {
    this.formMain.reset();
    this.formLoad();
    this.errorsPanelHiddenShow = false;
    this.selectedEntityTypeToGo = '';
    this.selectedNameEntityToGo = '';
    this.selectedEntityTypeToPay = '';
    this.selectedNameEntityToPay = '';
    this.clearCheckboxes = false;
    this.markAsCustomerAfterSave = 'customer';
  }

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
      billingFrom: this.billingFromSubForm = this._fb.group({
        partnerId: [null, []],
        customerId: [null, []],
        base: [true, []]
      }),
      destiny: this.destinySubForm = this._fb.group({
        customerId: [null, []],
        partnerId: [null, []],
        noRegisterName: [null, []],
        noRegisterAddress: [null, []]
      }),
    })
  }

  lengthCustomer: number;
  lengthPartner: number;
  ngOnInit(): void {

    this.screen();

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

    this.loadformsFake();

    new CollectDeliverFormHandle().destinySubFormSetValidator(this.destinySubForm);

  }

}
