import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/dto/collect-deliver-dto';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { GetCustomerMatSelectSingleComponent } from 'src/shared/components/get-entities/customer/get-customer-mat-select-single.component';
import { GetTransporterMatSelectSingleComponent } from 'src/shared/components/get-entities/partner-transporter/get-transporter-mat-select-single.component';
import { GetPartnerMatSelectSingleComponent } from 'src/shared/components/get-entities/partner/get-partner-mat-select-single.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ConfirmDialogCollectDeliverComponent } from '../../commons-components/confirmation-panel-collect-deliver/confirm-dialog-collect-deliver.component';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { OthersDestiniesComponent } from '../../commons-components/other-form-destinies/others-destinies.component';
import { SubjectContactComponent } from '../../commons-components/subject-contact/subject-contact.component';
import { BillingFromDto } from '../../dto/billing-from-dto';
import { DestinyDto } from '../../dto/destiny-dto';
import { CollectDeliverValidators } from '../../validators/collect-deliver-validators';
import { CollectDeliverEditService } from './services/collect-deliver-edit.service';


@Component({
  selector: 'collect-deliver-create',
  // encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    SubjectContactComponent,
    GetCustomerMatSelectSingleComponent,
    GetPartnerMatSelectSingleComponent,
    OthersDestiniesComponent,
    GetTransporterMatSelectSingleComponent,
    DescriptionFieldComponent,
    BtnGComponent
  ],
  templateUrl: './collect-deliver-edit.component.html',
  styleUrls: ['./collect-deliver-edit.component.css'],
  providers: [CollectDeliverEditService],
})
export class CollectDeliverEditComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _editService: CollectDeliverEditService,
    private _actRouter: ActivatedRoute,
    private _dialog: MatDialog,
  ) { super(_breakpointObserver) }


  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valLocal = CollectDeliverValidators;
  get validatorLocal() {
    return this.valLocal
  }

  // selectedEntity: string;
  entities: string[] = ['Clientes', 'Parceiros', 'Outros'];
  entitiesToPayment: string[] = ['Clientes', 'Parceiros'];
  transportOptions: string[] = ['Combustível', 'Aplicativo', 'MotoBoy', 'Transporte publico'];
  screenFieldPosition: string = 'column';
  screenFieldPositionSub: string = 'row';
  checkBoxAlign: string = 'center'
  topBottomPaddingEntitiesRadio: boolean = false;
  rightSideBorder: string = "border-right: 0.5px solid silver; padding-right:30px;";
  pricePayment: string = 'margin-top:38px;';
  fxLayoutAlignTypeTransportPriceDestiny: string = '';
  sizeScreenIsSmall: boolean = false;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.sizeScreenIsSmall = true;
            this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            this.pricePayment = 'margin-top:-30px;';
            this.fxLayoutAlignTypeTransportPriceDestiny = '50';
            break;
          }
          case 'small': {
            this.sizeScreenIsSmall = true;
            this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            this.pricePayment = 'margin-top:-30px;';
            this.fxLayoutAlignTypeTransportPriceDestiny = '50';
            break;
          }
          case 'medium': {
            this.sizeScreenIsSmall = false;
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            this.pricePayment = 'margin-top:38px;';
            this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
          case 'large': {
            this.sizeScreenIsSmall = false;
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            this.pricePayment = 'margin-top:38px;';
            this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
          case 'xlarge': {
            this.sizeScreenIsSmall = false;
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            this.pricePayment = 'margin-top:38px;';
            this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
        }
      }
    })
  }


  // @ViewChild('collect') collect!: MatCheckboxChange;
  // @ViewChild('deliver') deliver!: MatCheckboxChange;
  // @ViewChild('other') other!: MatCheckboxChange;
  onCollectChecked(selected: MatCheckboxChange) {
    // this.collect.checked = selected.checked;
    selected.checked == true ? true : false;
    // selected.checked == true ? this.formMain.get('collect').setValue(new Date()) : false;
  }

  onDeliveryChecked = (selected: MatCheckboxChange) => {
    // this.collect.checked = selected.checked;
    selected.checked == true ? true : false;
    // selected.checked == true ? this.formMain.get('deliver').setValue(new Date()) : false;
  }

  onOtherChecked = (selected: MatCheckboxChange) => {
    // this.collect.checked = selected.checked;
    selected.checked == true ? true : false;
    // selected.checked == true ? this.formMain.get('other').setValue(new Date()) : false;
  }

  selectedDestiny: string = null;
  onSelectedRadioDestiny(selected: MatRadioChange) {
    const selectedEntity = selected;
    this.selectedDestiny = selectedEntity.value;
    if (selectedEntity.value === 'Clientes') {
      this.destiny.get('partnerId').setValue(null);
      this.destiny.get('noRegisterName').setValue(null);
      this.destiny.get('noRegisterAddress').setValue(null);
    }

    if (selectedEntity.value === 'Parceiros') {
      this.destiny.get('customerId').setValue(null);
      this.destiny.get('noRegisterName').setValue(null);
      this.destiny.get('noRegisterAddress').setValue(null);
    }

    if (selectedEntity.value === 'Outros') {
      this.destiny.get('customerId').setValue(null);
      this.destiny.get('partnerId').setValue(null);
    }


  }


  selectedTransporter: PartnerDto;
  onTransporterSelected(value: PartnerDto) {
    this.selectedTransporter = value;
  }


  selectedCustomerDestiny: CustomerDto;
  onCustomerSelectedDestiny(value: CustomerDto) {
    this.selectedCustomerDestiny = value;
  }

  selectedPartnerDestiny: PartnerDto;
  onPartnerSelectedDestiny(value: PartnerDto) {
    this.selectedPartnerDestiny = value;
  }

  selectedCustomerPayment: CustomerDto;
  onCustomerSelectedPayment(value: CustomerDto) {
    this.selectedCustomerPayment = value;

  }

  selectedPartnerPayment: PartnerDto;
  onPartnerSelectedPayment(value: PartnerDto) {
    this.selectedPartnerPayment = value;
  }

  onPriceSelectedPayment(typeTransporte: string) {
    const selected = typeTransporte;
    if (selected === 'Combustível') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.fuel || this?.selectedPartnerPayment?.physicallyMovingCosts?.fuel);
      this.kindTransport('Combustível');
    }
    if (selected === 'Aplicativo') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.apps || this?.selectedPartnerPayment?.physicallyMovingCosts?.apps);
      this.kindTransport('Aplicativo');
    }
    if (selected === 'MotoBoy') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.motoBoy || this?.selectedPartnerPayment?.physicallyMovingCosts?.motoBoy);
      this.kindTransport('MotoBoy');
    }
    if (selected === 'Transporte publico') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.publicTransport || this?.selectedPartnerPayment?.physicallyMovingCosts?.publicTransport);
      this.kindTransport('Transporte publico');
    }
  }


  kindTransport(selected: string) {
    this.formMain.get('kindTransport').setValue(selected);
  }


  onPriceSelectedDestiny(typeTransporte: string) {
    const selected = typeTransporte;

    if (selected === 'Combustível') {
      this.formMain.get('price').setValue(this?.selectedCustomerDestiny?.physicallyMovingCosts?.fuel || this?.selectedPartnerDestiny?.physicallyMovingCosts?.fuel);
      this.kindTransport('Combustível');
    }
    if (selected === 'Aplicativo') {
      this.formMain.get('price').setValue(this?.selectedCustomerDestiny?.physicallyMovingCosts?.apps || this?.selectedPartnerDestiny?.physicallyMovingCosts?.apps);
      this.kindTransport('Aplicativo');
    }
    if (selected === 'MotoBoy') {
      this.formMain.get('price').setValue(this?.selectedCustomerDestiny?.physicallyMovingCosts?.motoBoy || this?.selectedPartnerDestiny?.physicallyMovingCosts?.motoBoy);
      this.kindTransport('MotoBoy');
    }
    if (selected === 'Transporte publico') {
      this.formMain.get('price').setValue(this?.selectedCustomerDestiny?.physicallyMovingCosts?.publicTransport || this?.selectedPartnerDestiny?.physicallyMovingCosts?.publicTransport);
      this.kindTransport('Transporte publico');
    }

  }

  openDialogConfirmationPanel(): void {

    const dialogRef = this._dialog.open(ConfirmDialogCollectDeliverComponent, {
      width: '100%',
      height: '100%',
      data: {
        title: 'Tudo Certo?',
        subject: this?.formMain?.get('subjectReason')?.value,
        price: this?.formMain?.get('price')?.value,
        contact: this?.formMain?.get('contactName')?.value,
        collect: this?.formMain?.get('collect')?.value === true ? 'Sim' : 'Não',
        deliver: this?.formMain?.get('deliver')?.value === true ? 'Sim' : 'Não',
        other: this?.formMain?.get('other')?.value === true ? 'Sim' : 'Não',
        itemsOrService: this?.formMain?.get('taskOverView')?.value,
        destiny: this?.selectedCustomerDestiny?.name || this?.selectedPartnerDestiny?.name || this?.destiny?.get('noRegisterName')?.value && this?.destiny?.get('noRegisterAddress')?.value,
        transporter: this?.selectedTransporter?.name,
        payer: this?.selectedCustomerPayment?.name || this?.selectedPartnerPayment?.name
      },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'confirm-dialog-collect-deliver',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result)
        this._editService.update(this.formMain);

    })

  }

  disablePaymentDestiny: boolean = false;
  cleanEntity: boolean = false;
  localCostToPayment($event: MatRadioButton) {

    if ($event.checked) {

      this?.subForm?.get('customerId')?.setValue(null);
      this?.subForm?.get('PartnerId')?.setValue(null);
      this?.subForm?.get('base')?.setValue($event.checked);
      this.formMain.get('kindTransport').setValue('Combustível');
    }
    else {
      this?.destiny?.get('customerId')?.setValue(null);
      this?.destiny?.get('PartnerId')?.setValue(null);
      this?.subForm?.get('base')?.setValue(false);
      this?.formMain?.get('price')?.setValue(0);
      this.selectedCustomerDestiny = null;
      this.selectedPartnerDestiny = null;
      this.cleanEntity = !this?.cleanEntity;

    }

    this.disablePaymentDestiny = $event.checked;
  }

  selectedEntityToPayment: string = 'Clientes';
  selectedNameEntityToPay: string;
  selectedEntityTypeToPay: string;
  onSelectedRadioPayment(selected: MatRadioButton) {

    const selectedEntity = selected;
    if (selectedEntity.value === 'Clientes') {
      this.subForm.get('partnerId').setValue(null);
      this.selectedPartnerPayment = null;
      this.formMain.get('price').setValue(0);
    }

    if (selectedEntity.value === 'Parceiros') {
      this.subForm.get('customerId').setValue(null);
      this.selectedCustomerPayment = null;
      this.formMain.get('price').setValue(0);
    }

  }

  destiny: FormGroup;
  formLoad(entity?: CollectDeliverDto) {
    this.formMain = this._fb.group({
      id: [entity?.id || 0, []],
      companyId: [entity?.companyId || this.companyId, [Validators.required]],
      userId: [entity?.userId || this.userId, [Validators.required]],
      transporterId: [entity?.transporterId || '', [Validators.required]],
      // subjectReason: [entity?.subjectReason || '', [Validators.required, Validators.maxLength(150)]],
      contactName: [entity?.contactName || '', [Validators.required, Validators.maxLength(50)]],
      start: [entity?.start || '', [Validators.required]],
      price: [entity?.price || 0, [Validators.required]],
      collect: [new Date(entity?.collect).getFullYear() != this.minValue.getFullYear() ? true : false, []],
      deliver: [new Date(entity?.deliver).getFullYear() != this.minValue.getFullYear() ? true : false, []],
      other: [new Date(entity?.other).getFullYear() != this.minValue.getFullYear() ? true : false, []],
      // collect: ['', []],
      // deliver: ['', []],
      // other: ['', []],
      kindTransport: [entity?.kindTransport || '', [Validators.required]],
      taskOverView: [entity?.taskOverView || '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.subForm = this._fb.group({
        id: [entity?.billingFrom?.id || 0, []],
        companyId: [entity?.companyId || this.companyId, [Validators.required]],
        userId: [entity?.userId || this.userId, [Validators.required]],
        partnerId: [entity?.billingFrom?.partnerId || null, [Validators.required]],
        customerId: [entity?.billingFrom?.customerId || null, [Validators.required]],
        base: [entity?.billingFrom?.base || false, [Validators.required]]
      }),
      destiny: this.destiny = this._fb.group({
        id: [entity?.destiny?.id || 0, []],
        companyId: [entity?.companyId || this.companyId, [Validators.required]],
        userId: [entity?.userId || this.userId, [Validators.required]],
        customerId: [entity?.destiny?.customerId || null, [Validators.required]],
        partnerId: [entity?.destiny?.partnerId || null, [Validators.required]],
        noRegisterName: [entity?.destiny?.noRegisterName || null, [Validators.required]],
        noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, [Validators.required]]
      }),
    })


  }

  getEntityId(id: number) {

    const collectDeliver: Observable<CollectDeliverDto> = this._editService.loadById$('GetByIdAllIncluded', id.toString());
    collectDeliver.subscribe(x => {
      this.formLoad(x);
      this.loadTypeSelectedEntityDestiny(x.destiny);
      this.loadTypeSelectedEntityPayment(x.billingFrom);
    });


  }

  loadTypeSelectedEntityDestiny(entity: DestinyDto) {
    if (entity.customerId) {
      this.selectedDestiny = 'Clientes';
      this.selectedCustomerDestiny = entity.customer;
    }

    if (entity.partnerId) {
      this.selectedDestiny = 'Parceiros';
      this.selectedPartnerDestiny = entity.partner;
    }

    if (entity.noRegisterAddress && entity.noRegisterName)
      this.selectedDestiny = 'Outros';
  }

  loadTypeSelectedEntityPayment(entity: BillingFromDto) {

    if (entity.customerId) {
      this.selectedEntityToPayment = 'Clientes';
      this.selectedCustomerPayment = entity.customer

    }

    if (entity.partnerId) {
      this.selectedEntityToPayment = 'Parceiros';
      this.selectedPartnerPayment = entity.partner
    }

    this.disablePaymentDestiny = entity.base

  }

  update() {


    if (this.validatorLocal.atLeastOneEntitySelectedPaymentEndDestiny(this.destiny, ['customerId', 'partnerId', 'noRegisterName', 'noRegisterAddress'])) {
      if (this.validatorLocal.atLeastOneEntitySelectedPaymentEndDestiny(this.subForm, ['customerId', 'partnerId', 'base'])) {

        this.validatorLocal.removeValidatorsCollectDeliverEditOnUpdate(this.destiny, ['customerId', 'partnerId', 'noRegisterName', 'noRegisterAddress']);
        this.validatorLocal.removeValidatorsCollectDeliverEditOnUpdate(this.subForm, ['customerId', 'partnerId']);

      }
    }


    if (this.alertSave(this.formMain)) {
      this.openDialogConfirmationPanel();
    }
  }


  ngOnInit(): void {
    const id = this._actRouter.snapshot.params['id'];
    this.getEntityId(id);
    this.screen();
    this.validatorLocal.required(this.formMain, ['transporterId']);
  }

}
