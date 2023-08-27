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
import { CollectDeliver } from '../../validators/collect-deliver';
import { CollectDeliverCreateService } from '../services/collect-deliver-create.service';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPanelComponent } from './confirmation-panel/confirmation-panel.component';
import { TypePartnerEnumDto } from 'src/components/main/partner/dto/enums/type-partner-enum-dto';


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

  screenFieldPosition: string = 'row';

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

            break;
          }
          case 'small': {

            break;
          }
          case 'medium': {

            break;
          }
          case 'large': {

            break;
          }
          case 'xlarge': {

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

  setForm(field: string, content: any, source: string) {
    if (source === 'formMain')
      this?.formMain?.get(field)?.setValue(content);

    if (source === 'subForm')
      this?.subForm?.get(field)?.setValue(content);
  }

  cleanForm(field: string, form: string) {

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
    this.setForm('start', new Date(), 'formMain')
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
  // formLoad() {
  //   return this.formMain = this._fb.group({
  //     companyId: ['', []],
  //     userId: ['', []],
  //     transporterId: ['', []],
  //     transporter: ['', []],
  //     subjectReason: ['', []],
  //     contactName: ['', []],
  //     start: ['', []],
  //     taskOverView: ['', []],
  //     billingFrom: {
  //       partnerId: ['', []],
  //       customerId: ['', []],
  //       base: ['', []],
  //       amountPrice: ['', []]
  //     },
  //     destinies: this._fb.array([])
  //   }
  //   )
  // }
  // destinySubForm() {
  //   return this.subForm = this._fb.group({
  //     customerId: ['', []],
  //     partnerId: ['', []],
  //     noRegisterName: ['', []],
  //     noRegisterAddress: ['', []],
  //     price: ['', []],
  //     collect: ['', []],
  //     deliver: ['', []],
  //     description: ['', []],
  //     collectDeliverId: ['', []]
  //   })
  // }

  get destiniesSubFormArray(): FormArray {
    return <FormArray>this.formMain.get('destinies');
  }

  // addDestiny() {
  //   this.destiniesSubFormArray.push(this.destinySubForm());
  // }

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

  // UpdateRadioButtonOptionToGo: boolean;
  // UpdateRadioButtonOptionToPay: boolean;
  // selectedStep($event: any) {
  //   const selected = $event.selectedIndex;
  //   switch (selected) {
  //     case 0:
  //       this.radioChose('customer')
  //       this.UpdateRadioButtonOptionToGo = false;
  //       this.UpdateRadioButtonOptionToPay = false;
  //       this.chargeShowHide = false;
  //       break;
  //     case 1:
  //       this.radioChose('customer')
  //       this.UpdateRadioButtonOptionToGo = true;
  //       this.UpdateRadioButtonOptionToPay = false;
  //       this.chargeShowHide = true;
  //       break;
  //     case 2:
  //       this.radioChose('customer')
  //       this.UpdateRadioButtonOptionToGo = false;
  //       this.UpdateRadioButtonOptionToPay = false;
  //       this.chargeShowHide = false;
  //       break;
  //     case 3:
  //       this.radioChose('customer')
  //       this.UpdateRadioButtonOptionToGo = false;
  //       this.UpdateRadioButtonOptionToPay = false;
  //       this.chargeShowHide = false;
  //       break;
  //     case 4:
  //       this.radioChose('customer');
  //       this.UpdateRadioButtonOptionToGo = false;
  //       this.UpdateRadioButtonOptionToPay = true;
  //       this.chargeShowHide = false;
  //       break;
  //   }
  // }

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
        this.cleanForm('partner', 'formMain');
        this.cleanForm('customer', 'formMain');
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

        this.setForm('customer', `${selected.entity.id}, ${selected.entity.name}`, 'formMain');
        this.cleanForm('partner', 'formMain');
        this.cleanForm('noRegisterName', 'formMain');
        this.cleanForm('noRegisterAddress', 'formMain');
        this.selectedNameEntityToGo = selected.entity.name;
        this.selectedEntityTypeToGo = 'Cliente';

        break;
      case 'partner':

        this.setForm('partner', `${selected.entity.id}, ${selected.entity.name}`, 'formMain');
        this.cleanForm('customer', 'formMain');
        this.cleanForm('noRegisterName', 'formMain');
        this.cleanForm('noRegisterAddress', 'formMain');
        this.selectedNameEntityToGo = selected.entity.name;
        this.selectedEntityTypeToGo = 'Parceiro';

        break;
      case 'others':
        this.cleanForm('partner', 'formMain');
        this.cleanForm('customer', 'formMain');
        break;
    }

  }

  selectedNameEntityToPay: any = null;
  selectedEntityTypeToPay: string = '';
  selectedEntityToPay(selected: any) {
    switch (selected.type) {
      case 'customer':
        this.cleanForm('partnerId', 'subForm');
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'Cliente';
        this.formMain.get('chargeForm').get('base').setValue(false)
        this.setForm('customerId', `${selected.entity.id}, ${selected.entity.name}`, 'subForm');
        break;
      case 'partner':
        this.cleanForm('customerId', 'subForm');
        this.selectedNameEntityToPay = selected.entity.name;
        this.selectedEntityTypeToPay = 'Parceiro';
        this.formMain.get('chargeForm').get('base').setValue(false)
        this.setForm('partnerId', `${selected.entity.id}, ${selected.entity.name}`, 'subForm');
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

    this.setForm('customerId', this.subForm.get('customerId').value?.split(',')[0], 'subForm')
    this.setForm('partnerId', this.subForm.get('partnerId').value?.split(',')[0], 'subForm')
    this.setForm('transporterId', this.formMain.get('transporterId').value?.split(',')[0], 'formMain')
    //just to make sure bellow
    this.setForm('companyId', localStorage.getItem("companyId"), 'formMain')

    this._cDCreateService.save(this.formMain);
    this.chargeShowHide = false;
    this.cleanReloadAfterSave();
  }

  handleChargeForm() {

    const customer: number = this.subForm.get('customerId').value;
    const partner: number = this.subForm.get('partnerId').value;
    const base: number = this.subForm.get('base').value;

    if (base) {
      this.setForm('base', true, 'subForm')

      this.cleanForm('customerId', 'subForm');
      this.cleanForm('partnerId', 'subForm');
    }

    if (customer) {
      this.setForm('customerId', customer, 'subForm')
      this.setForm('base', false, 'subForm')

      this.cleanForm('partnerId', 'subForm');
    }

    if (partner) {
      this.setForm('partnerId', partner, 'subForm')
      this.setForm('base', false, 'subForm')

      this.cleanForm('customerId', 'subForm');
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
    return this.transportersToView.filter(x => x.partnerType == TypePartnerEnumDto.Transporter);
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

