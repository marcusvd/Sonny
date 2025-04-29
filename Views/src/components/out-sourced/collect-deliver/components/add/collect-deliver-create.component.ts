import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxChange as MatCheckboxChange, MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyRadioButton as MatRadioButton, MatLegacyRadioChange as MatRadioChange, MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { PartnerDto } from 'src/components/main/partner/commons-components/dtos/partner-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/dto/collect-deliver-dto';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GetCustomerMatSelectSingleComponent } from 'src/shared/components/get-entities/customer/get-customer-mat-select-single.component';
import { GetTransporterMatSelectSingleComponent } from 'src/shared/components/get-entities/partner-transporter/get-transporter-mat-select-single.component';
import { GetPartnerMatSelectSingleComponent } from 'src/shared/components/get-entities/partner/get-partner-mat-select-single.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ConfirmDialogCollectDeliverComponent } from '../../commons-components/confirmation-panel-collect-deliver/confirm-dialog-collect-deliver.component';
import { OthersDestiniesComponent } from '../../commons-components/other-form-destinies/others-destinies.component';
import { SubjectContactComponent } from '../../commons-components/subject-contact/subject-contact.component';
import { CollectDeliverValidators } from '../../validators/collect-deliver-validators';
import { CollectDeliverCreateService } from './services/collect-deliver-create.service';


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
  templateUrl: './collect-deliver-create.component.html',
  styleUrls: ['./collect-deliver-create.component.css'],
  providers: [CollectDeliverCreateService],
})
export class CollectDeliverCreateComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _createService: CollectDeliverCreateService,
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

  entities: string[] = ['Clientes', 'Parceiros', 'Outros'];
  entitiesToPayment: string[] = ['Clientes', 'Parceiros'];
  transportOptions: string[] = ['Combustível', 'Aplicativo', 'MotoBoy', 'Transporte publico'];
  screenFieldPosition: string = 'column';
  screenFieldPositionSub: string = 'row';
  checkBoxAlign: string = 'center'
  topBottomPaddingEntitiesRadio: boolean = false;
  rightSideBorder: string = "border-right: 0.5px solid silver; padding-right:30px;";
  // pricePayment: string = 'margin-top:38px;';
  // fxLayoutAlignTypeTransportPriceDestiny: string = '';
  sizeScreenIsSmall: boolean = false;

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.sizeScreenIsSmall = true;
            // this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            // this.pricePayment = 'margin-top:-30px;';
            // this.fxLayoutAlignTypeTransportPriceDestiny = '50';
            break;
          }
          case 'small': {
            this.sizeScreenIsSmall = true;
            // this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            // this.pricePayment = 'margin-top:-30px;';
            // this.fxLayoutAlignTypeTransportPriceDestiny = '50';
            break;
          }
          case 'medium': {
            this.sizeScreenIsSmall = false;
            // this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            // this.pricePayment = 'margin-top:38px;';
            // this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
          case 'large': {
            this.sizeScreenIsSmall = false;
            // this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            // this.pricePayment = 'margin-top:38px;';
            // this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
          case 'xlarge': {
            this.sizeScreenIsSmall = false;
            // this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            // this.pricePayment = 'margin-top:38px;';
            // this.fxLayoutAlignTypeTransportPriceDestiny = '';
            break;
          }
        }
      }
    })
  }

  onCollectChecked = (selected: MatCheckboxChange) =>
    selected.checked == true ? this.formMain.get('collect').setValue(new Date()) : this.formMain.get('collect').setValue(this.minValue);

  onDeliveryChecked = (selected: MatCheckboxChange) =>
    selected.checked == true ? this.formMain.get('deliver').setValue(new Date()) : this.formMain.get('deliver').setValue(this.minValue);

  onOtherChecked  = (selected: MatCheckboxChange) =>
    selected.checked == true ? this.formMain.get('other').setValue(new Date()) : this.formMain.get('other').setValue(this.minValue);


  selectedDestiny: string = 'Clientes';
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
    this.formMain.get('transporterId').setValue(this.selectedTransporter.id)
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
      this.formMain.get('kindTransport').setValue('Combustível');
    }
    if (selected === 'Aplicativo') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.apps || this?.selectedPartnerPayment?.physicallyMovingCosts?.apps);
      this.formMain.get('kindTransport').setValue('Aplicativo');
    }
    if (selected === 'MotoBoy') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.motoBoy || this?.selectedPartnerPayment?.physicallyMovingCosts?.motoBoy);
      this.formMain.get('kindTransport').setValue('MotoBoy');
    }
    if (selected === 'Transporte publico') {
      this.formMain.get('price').setValue(this?.selectedCustomerPayment?.physicallyMovingCosts?.publicTransport || this?.selectedPartnerPayment?.physicallyMovingCosts?.publicTransport);
      this.formMain.get('kindTransport').setValue('Transporte publico');
    }
  }

  onPriceSelectedDestiny(typeTransporte: string) {
    const selected = typeTransporte;

    if (selected === 'Combustível')
      this.formMain.get('price').setValue(this?.selectedCustomerDestiny?.physicallyMovingCosts?.fuel || this?.selectedPartnerDestiny?.physicallyMovingCosts?.fuel);
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
        this._createService.save(this.formMain);
    })
  }

  disablePaymentDestiny: boolean = false;
  cleanEntity: boolean = false;
  localCostToPayment($event: MatRadioButton) {

    if ($event.checked) {
      this.subForm.get('customerId').setValue(null);
      this.subForm.get('partnerId').setValue(null);
      this.subForm.get('base').setValue(true);

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

    this.disablePaymentDestiny = !this.disablePaymentDestiny;
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
    return this.formMain = this._fb.group({
      id: [entity?.id || 0, []],
      companyId: [entity?.companyId || this.companyId, [Validators.required]],
      userId: [entity?.userId || this.userId, [Validators.required]],
      transporterId: [entity?.transporterId || '', [Validators.required]],
      start: [entity?.start || '', [Validators.required]],
      contactName: [entity?.contactName || '', [Validators.required, Validators.maxLength(50)]],
      price: [entity?.price || 0, [Validators.required]],
      collect: [entity?.collect || this.minValue, []],
      deliver: [entity?.deliver || this.minValue, []],
      other: [entity?.other || this.minValue, []],
      kindTransport: ['', [Validators.required]],
      taskOverView: [entity?.taskOverView || '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.subForm = this._fb.group({
        companyId: [entity?.companyId || this.companyId, [Validators.required]],
        // userId: [entity?.userId || this.userId, [Validators.required]],
        partnerId: [entity?.billingFrom?.partnerId || null, [Validators.required]],
        customerId: [entity?.billingFrom?.customerId || null, [Validators.required]],
        base: [entity?.billingFrom?.base || false, [Validators.required]]
      }),
      destiny: this.destiny = this._fb.group({
        companyId: [entity?.companyId || this.companyId, [Validators.required]],
        // userId: [entity?.userId || this.userId, [Validators.required]],
        customerId: [entity?.destiny?.customerId || null, [Validators.required]],
        partnerId: [entity?.destiny?.partnerId || null, [Validators.required]],
        noRegisterName: [entity?.destiny?.noRegisterName || null, [Validators.required]],
        noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, [Validators.required]]
      }),
    })
  }

  // formLoad(entity?: CollectDeliverDto) {
  //   return this.formMain = this._fb.group({
  //     id: [entity?.id || 0, []],
  //     companyId: [entity?.companyId || localStorage.getItem("companyId"), [Validators.required]],
  //     userId: [entity?.userId || localStorage.getItem("userId"), [Validators.required]],
  //     transporterId: [entity?.transporterId || 3, [Validators.required]],
  //     subjectReason: [entity?.subjectReason || 'fgdgfddgffgsdfg', [Validators.required, Validators.maxLength(150)]],
  //     contactName: [entity?.contactName || 'fgdsfgfgdgfsdgfsd', [Validators.required, Validators.maxLength(50)]],
  //     price: [entity?.price || 435456, [Validators.required]],
  //     collect: [entity?.collect || true, []],
  //     deliver: [entity?.deliver || false, []],
  //     other: [entity?.other || false, []],
  //     kindTransport: ['', [Validators.required]],
  //     taskOverView: [entity?.taskOverView || 'feegrfgeegregrgg', [Validators.required, Validators.maxLength(1000)]],
  //     billingFrom: this.subForm = this._fb.group({
  //       partnerId: [entity?.billingFrom?.partnerId || null, [Validators.required]],
  //       customerId: [entity?.billingFrom?.customerId || 1, [Validators.required]],
  //       base: [entity?.billingFrom?.base || false, [Validators.required]]
  //     }),
  //     destiny: this.destiny = this._fb.group({
  //       customerId: [entity?.destiny?.customerId || 1, [Validators.required]],
  //       partnerId: [entity?.destiny?.partnerId || null, [Validators.required]],
  //       noRegisterName: [entity?.destiny?.noRegisterName || null, [Validators.required]],
  //       noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, [Validators.required]]
  //     }),
  //   })
  // }

  save() {
    this.validatorLocal.removeValidatorsDestiny(this.destiny, ['customerId', 'partnerId', 'noRegisterName', 'noRegisterAddress']);
    this.validatorLocal.removeValidatorsPayment(this.subForm, ['customerId', 'partnerId', 'base']);

    console.log(this.formMain.controls)
    if (this.alertSave(this.formMain))
      this.openDialogConfirmationPanel();

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.validatorLocal.required(this.formMain, ['transporterId']);
  }

}
