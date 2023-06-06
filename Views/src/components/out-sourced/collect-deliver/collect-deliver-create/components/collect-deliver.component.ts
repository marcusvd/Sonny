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
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPanelComponent } from './confirmation-panel/confirmation-panel.component';


@Component({
  selector: 'deliver-collect',
  templateUrl: './collect-deliver.component.html',
  styleUrls: ['./collect-deliver.component.css'],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  url: string = 'customers/GetAllPagedCustomersAsync';
  errorsPanelHiddenShow: boolean = false;

  title: string = "transfer_within_a_station";
  subTitle: string = 'Coleta / Entrega';

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
    private _dialog: MatDialog
  ) { super(_breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.destinyChargeCols = 1;
            break;
          }
          case 'small': {
            this.startPriceTransporterCols = 1;
            this.subjectCollectDeliverCols = 1;
            this.itemsCollectedItemsDeliveredCols = 1;
            this.destinyChargeCols = 1;
            break;
          }
          case 'medium': {
            this.startPriceTransporterCols = 2;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.destinyChargeCols = 2;
            break;
          }
          case 'large': {
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
            this.destinyChargeCols = 2;
            break;
          }
          case 'xlarge': {
            this.startPriceTransporterCols = 3;
            this.subjectCollectDeliverCols = 3;
            this.itemsCollectedItemsDeliveredCols = 2;
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

  setEntityForm(field: string, content: any, source: string) {
    if (source === 'formMain')
      this?.formMain?.get(field)?.setValue(content);

    if (source === 'subForm')
      this?.subForm?.get(field)?.setValue(content);
  }

  cleanEntityForm(field: string, form: string) {

    if (form === 'formMain') {
      this?.formMain?.get(field)?.setValue(null);
      this?.formMain?.get(field)?.removeValidators(Validators.required);
      this?.formMain?.get(field)?.updateValueAndValidity();
    }

    if (form === 'subForm') {
      this?.subForm?.get(field)?.setValue(null);
      this?.subForm?.get(field)?.removeValidators(Validators.required);
      this?.subForm?.get(field)?.updateValueAndValidity();
    }
  }

  actualDate() {
    this.setEntityForm('start', new Date(), 'formMain')
  }

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [localStorage.getItem("companyId"), []],
      subject: ['', [Validators.maxLength(137)]],
      ownerResponsible: ['', [Validators.required, Validators.maxLength(45)]],
      collect: [false, []],
      deliver: [false, []],
      chargeForm: this.subForm = this._fb.group({
        customerId: ['', []],
        partnerId: ['', []],
        base: [true, []],
      }),
      customer: ['', [Validators.required, Validators.maxLength(500)]],
      partner: ['', [Validators.required, Validators.maxLength(500)]],
      itemsCollected: ['', [Validators.maxLength(500)]],
      itemsDelivered: ['', [Validators.maxLength(500)]],
      comments: ['', [Validators.maxLength(500)]],
      start: ['', []],
      price: ['', []],
      transporterId: ['', []],
      noRegisterName: ['', [Validators.required, Validators.maxLength(250)]],
      noRegisterAddress: ['', [Validators.required, Validators.maxLength(250)]],
    })

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

  chargeShowHide: boolean = false;
  toCharger($event: any) {
    console.log($event)
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
    this.selectedNameEntityToPay = ''


    this.chargeShowHide = $event.checked;
  }

  @ViewChild('stepper') private myStepper: MatStepper;
  nextStep(stepper: boolean) {
    if (stepper)
      this.myStepper.next();
  }

  UpdateRadioButtonOptionToGo: boolean;
  UpdateRadioButtonOptionToPay: boolean;
  selectedStep($event: any) {
    const selected = $event.selectedIndex;
    switch (selected) {
      case 0:
        this.radioChose('customer')
        this.UpdateRadioButtonOptionToGo = false;
        this.UpdateRadioButtonOptionToPay = false;
        this.chargeShowHide = false;
        break;
      case 1:
        this.radioChose('customer')
        this.UpdateRadioButtonOptionToGo = true;
        this.UpdateRadioButtonOptionToPay = false;
        this.chargeShowHide = true;
        break;
      case 2:
        this.radioChose('customer')
        this.UpdateRadioButtonOptionToGo = false;
        this.UpdateRadioButtonOptionToPay = false;
        this.chargeShowHide = false;
        break;
      case 3:
        this.radioChose('customer')
        this.UpdateRadioButtonOptionToGo = false;
        this.UpdateRadioButtonOptionToPay = false;
        this.chargeShowHide = false;
        break;
      case 4:
        this.radioChose('customer');
        this.UpdateRadioButtonOptionToGo = false;
        this.UpdateRadioButtonOptionToPay = true;
        this.chargeShowHide = false;
        break;
    }
  }

  selectedRadio: string;
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
        this.cleanEntityForm('partner', 'formMain');
        this.cleanEntityForm('customer', 'formMain');
        this.selectedEntityTypeToGo = '';
        this.selectedNameEntityToGo = '';
        break;
    }
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

  selectedEntityTypeToGo: string = '';
  selectedNameEntityToGo: any = null;
  selectedEntityToGo(selected: any) {
    switch (selected.type) {
      case 'customer':

        this.setEntityForm('customer', `${selected.entity.id}, ${selected.entity.name}`, 'formMain');
        this.cleanEntityForm('partner', 'formMain');
        this.cleanEntityForm('noRegisterName', 'formMain');
        this.cleanEntityForm('noRegisterAddress', 'formMain');
        this.selectedNameEntityToGo = selected.entity.name;
        this.selectedEntityTypeToGo = 'customer';

        break;
      case 'partner':

        this.setEntityForm('partner', `${selected.entity.id}, ${selected.entity.name}`, 'formMain');
        this.cleanEntityForm('customer', 'formMain');
        this.cleanEntityForm('noRegisterName', 'formMain');
        this.cleanEntityForm('noRegisterAddress', 'formMain');
        this.selectedNameEntityToGo = selected.entity.name;
        this.selectedEntityTypeToGo = 'partner';

        break;
      case 'others':
        this.cleanEntityForm('partner', 'formMain');
        this.cleanEntityForm('customer', 'formMain');
        break;
    }

  }

  selectedNameEntityToPay: any = null;
  selectedEntityTypeToPay: string = '';
  selectedEntityToPay(selected: any) {
    switch (selected.type) {
      case 'customer':
        this.cleanEntityForm('partnerId', 'subForm');
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'customer';
        this.formMain.get('chargeForm').get('base').setValue(false)
        this.setEntityForm('customerId', `${selected.entity.id}, ${selected.entity.name}`, 'subForm');
        break;
      case 'partner':
        this.cleanEntityForm('customerId', 'subForm');
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'partner';
        this.formMain.get('chargeForm').get('base').setValue(false)
        this.setEntityForm('partnerId', `${selected.entity.id}, ${selected.entity.name}`, 'subForm');
        break;
    }
  }

  validators() {
    const ctrls: string[] = ['subject', 'start', 'price']
    ctrls.map(x => {
      this.formMain.get(x).setValidators(Validators.required)
      this.formMain.get(x).updateValueAndValidity();
    })

    this.valLocal.atLeastOneCheckBox(this.formMain, ['collect', 'deliver']);
  }

  handleForm(form: FormGroup) {

    const entityToShow = {
      'Motivo': '',
      'Responsável': '',
      'Destino Cliente': '',
      'Destino Parceiro': '',
      'Itens Coletados': '',
      'Itens Entregues': '',
      'Observações': '',
      'Data': '',
      'Preço': '',
      'Transportador': '',
      'Nome': '',
      'Endereço': '',
      'Cobrar de Cliente': '',
      'Cobrar de Parceiro': '',
      'Custo da base': '',
    }

    entityToShow.Motivo = this.formMain.get('subject').value;
    entityToShow.Responsável = this.formMain.get('ownerResponsible').value;
    entityToShow['Destino Cliente'] = this.formMain?.get('customer')?.value;
    entityToShow['Destino Parceiro'] = this.formMain?.get('partner')?.value;
    entityToShow['Itens Coletados'] = this.formMain.get('itemsCollected').value;
    entityToShow['Itens Entregues'] = this.formMain.get('itemsDelivered').value;
    entityToShow.Observações = this.formMain.get('comments').value;
    entityToShow.Data = this.formMain.get('start').value;
    entityToShow.Preço = this.formMain.get('price').value;
    entityToShow.Transportador = this.formMain?.get('transporterId')?.value;
    entityToShow.Nome = this.formMain.get('noRegisterName').value;
    entityToShow.Endereço = this.formMain.get('noRegisterAddress').value;
    entityToShow['Cobrar de Cliente'] = this.formMain.get('chargeForm').get('customerId').value;
    entityToShow['Cobrar de Parceiro'] = this.formMain.get('chargeForm').get('partnerId').value;
    entityToShow['Custo da base'] = this.formMain.get('chargeForm').get('base').value;

    return entityToShow;
  }

  openDialogConfirmationPanel(): void {

    const dialogRef = this._dialog.open(ConfirmationPanelComponent, {
      width: '800px',
      height: 'auto',
      data: {
        title: 'Tudo certo?',
        btn1: 'Sim, Salvar',
        btn2: 'Não, Editar',
        entity: this.handleForm(this.formMain)
      },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.split(',')[0] === 'Sim') {
        this.saveToBackEnd();
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

    this.setEntityForm('customerId', this.subForm.get('customerId').value?.split(',')[0], 'subForm')
    this.setEntityForm('partnerId', this.subForm.get('partnerId').value?.split(',')[0], 'subForm')
    this.setEntityForm('transporterId', this.formMain.get('transporterId').value?.split(',')[0], 'formMain')
    //just to make sure bellow
    this.setEntityForm('companyId', localStorage.getItem("companyId"), 'formMain')

    this._cDCreateService.save(this.formMain);
    this.chargeShowHide = false;
    this.cleanReloadAfterSave();
  }

  handleChargeForm() {

    const customer: number = this.subForm.get('customerId').value;
    const partner: number = this.subForm.get('partnerId').value;
    const base: number = this.subForm.get('base').value;

    if (base) {
      this.setEntityForm('base', true, 'subForm')

      this.cleanEntityForm('customerId', 'subForm');
      this.cleanEntityForm('partnerId', 'subForm');
    }

    if (customer) {
      this.setEntityForm('customerId', customer, 'subForm')
      this.setEntityForm('base', false, 'subForm')

      this.cleanEntityForm('partnerId', 'subForm');
    }

    if (partner) {
      this.setEntityForm('partnerId', partner, 'subForm')
      this.setEntityForm('base', false, 'subForm')

      this.cleanEntityForm('customerId', 'subForm');
    }
  }

  RadioSelectedStart: string = 'customer';
  @ViewChild('matCheckbox') receive: MatCheckbox
  save() {
    this.RadioSelectedStart = 'customer';

    this.handleChargeForm();
    this.validators();

    if (this.alertSave(this.formMain)) {
      this.openDialogConfirmationPanel()
    }
    else {
      this.errorsPanelHiddenShow = true;
    }


    this.receive.checked = false;
  }

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

