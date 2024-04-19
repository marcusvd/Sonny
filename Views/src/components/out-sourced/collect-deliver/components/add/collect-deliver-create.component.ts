import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/dto/collect-deliver-dto';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnSaveGComponent } from 'src/shared/components/btn-save-g/btn-save-g.component';
import { GetCustomerMatSelectSingleComponent } from 'src/shared/components/get-entities/get-customer-mat-select-single.component';
import { GetPartnerMatSelectSingleComponent } from 'src/shared/components/get-entities/get-partner-mat-select-single.component';
import { GetTransporterMatSelectSingleComponent } from 'src/shared/components/get-entities/get-transporter-mat-select-single.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { OthersDestiniesComponent } from '../../commons-components/other-form-destinies/others-destinies.component';
import { SubjectPriceContactComponent } from '../../commons-components/subject-price-contact.component';
import { CustomersService } from '../../services/customers.service';
import { PartnerService } from '../../services/partner.service';
import { ConfirmDialogCollectDeliverComponent } from '../../commons-components/confirmation-panel-collect-deliver/confirm-dialog-collect-deliver.component';
import { MatButtonModule } from '@angular/material/button';
import { CollectDeliverValidators } from '../../validators/collect-deliver-validators';
import { CollectDeliverCreateService } from '../../services/collect-deliver-create.service';

@Component({
  selector: 'collect-deliver-create',
  encapsulation: ViewEncapsulation.None,
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
    SubjectPriceContactComponent,
    GetCustomerMatSelectSingleComponent,
    GetPartnerMatSelectSingleComponent,
    OthersDestiniesComponent,
    GetTransporterMatSelectSingleComponent,
    DescriptionFieldComponent,
    BtnSaveGComponent
  ],
  templateUrl: './collect-deliver-create.component.html',
  styleUrls: ['./collect-deliver-create.component.css'],
  providers: [CustomersService, PartnerService,CollectDeliverCreateService],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _createService:CollectDeliverCreateService,
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
  screenFieldPosition: string = 'column';
  screenFieldPositionSub: string = 'row';
  checkBoxAlign: string = 'center'
  topBottomPaddingEntitiesRadio: boolean = false;
  rightSideBorder: string = "border-right: 0.5px solid silver; padding-right:30px;";
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            break;
          }
          case 'small': {
            this.rightSideBorder = null;
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = true;
            break;
          }
          case 'medium': {
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            break;
          }
          case 'large': {
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            break;
          }
          case 'xlarge': {
            this.rightSideBorder = "border-right: 0.5px solid silver; padding-right:30px;"
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';
            this.topBottomPaddingEntitiesRadio = false;
            break;
          }
        }
      }
    })
  }

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
  }


  selectedCustomerDestiny: CustomerDto;
  onCustomerSelectedDestiny(value: CustomerDto) {
    this.selectedCustomerDestiny = value;
  }

  selectedPartnerDestiny: PartnerDto;
  onPartnerSelectedDestiny(value: PartnerDto) {
    console.log(value)
    this.selectedPartnerDestiny = value;
  }

  selectedCustomerPayment: CustomerDto;
  onCustomerSelectedPayment(value: CustomerDto) {
    this.selectedCustomerPayment = value;
  }

  selectedPartnerPayment: PartnerDto;
  onPartnerSelectePayment(value: PartnerDto) {
    this.selectedPartnerPayment = value;
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
      // console.log(result)
      if (result=== 'yes') {
        console.log(this.formMain.value)
        this._createService.save(this.formMain);
        // this.saveToBackEnd();
      }
    })

  }

  paymentShowHide: boolean = false;
  toPayment($event: any) {

    if (!$event.checked) {
      this.subForm.setValue({
        customerId: null,
        partnerId: null,
        base: true,
      })
    }
    else
      this.subForm.get('base').setValue(false);

    this.paymentShowHide = $event.checked;
  }
  selectedEntityToPayment: string = 'Clientes';
  selectedNameEntityToPay: string;
  selectedEntityTypeToPay: string;
  selectedEntityToPay(selected: any) {

    const selectedEntity = selected;

    if (selectedEntity.value === 'Clientes') {
      this.subForm.get('partnerId').setValue(null);
      // this.subForm.get('customerId').setValue(selected.id);
      // this.selectedEntityToPayment = 'Clientes';
      // this.selectedNameEntityToPay = selected.entity.name;
      // this.selectedEntityTypeToPay = 'Cliente';
    }

    if (selectedEntity.value === 'Parceiros') {
      this.subForm.get('customerId').setValue(null);
      // this.subForm.get('partnerId').setValue(selected.id);
      // this.selectedEntityToPayment = 'Parceiro';
      // this.selectedNameEntityToPay = selected.entity.name;
      // this.selectedEntityTypeToPay = 'Parceiro';
    }

  }


  companyId: number = JSON.parse(localStorage.getItem('companyId'));
  destiny: FormGroup;
  formLoad(entity?: CollectDeliverDto) {
    return this.formMain = this._fb.group({
      id: [entity?.id || 0, []],
      companyId: [entity?.companyId || localStorage.getItem("companyId"), [Validators.required]],
      userId: [entity?.userId || localStorage.getItem("userId"), [Validators.required]],
      transporterId: [entity?.transporterId || '', [Validators.required]],
      subjectReason: [entity?.subjectReason || '', [Validators.required, Validators.maxLength(150)]],
      contactName: [entity?.contactName || '', [Validators.required, Validators.maxLength(50)]],
      price: [entity?.price || 0, [Validators.required]],
      collect: [entity?.collect || false, []],
      deliver: [entity?.deliver || false, []],
      other: [entity?.other || false, []],
      taskOverView: [entity?.taskOverView || '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.subForm = this._fb.group({
        partnerId: [entity?.billingFrom?.partnerId || null, [Validators.required]],
        customerId: [entity?.billingFrom?.customerId || null, [Validators.required]],
        base: [entity?.billingFrom?.base || true, [Validators.required]]
      }),
      destiny: this.destiny = this._fb.group({
        customerId: [entity?.destiny?.customerId || null, [Validators.required]],
        partnerId: [entity?.destiny?.partnerId || null, [Validators.required]],
        noRegisterName: [entity?.destiny?.noRegisterName || null, [Validators.required]],
        noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, [Validators.required]]
      }),
    })
  }

  test() {

    return this.formMain = this._fb.group({
      id: [0, []],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      userId: [localStorage.getItem("userId"), [Validators.required]],
      transporterId: [2 || '', [Validators.required]],
      subjectReason: ['Banco do brasil, pagamento de boleto direto no caixa.', [Validators.required, Validators.maxLength(150)]],
      contactName: ['Gerente de contas, PJ Lucas da Silva.', [Validators.required, Validators.maxLength(50)]],
      price: [22, [Validators.required]],
      collect: [false, []],
      deliver: [false, []],
      other: [true, []],
      taskOverView: ['Pagamento desse boleto só pode se realizado diretamente no caixa de uma agencia do B.B - Comprovante de pagamento para controle deve ser entregue pelo caixa ao motoqueiro e por sua vez para a empresa.', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.subForm = this._fb.group({
        partnerId: [null, []],
        customerId: [null, []],
        base: [true, []]
      }),
      destiny: this.destiny = this._fb.group({
        customerId: [null, []],
        partnerId: [null, []],
        noRegisterName: ['BANCO DO BRASIL Agência 1626', []],
        noRegisterAddress: ['FLORESTA-MG - Av. do Contorno, 1600 · (31) 4003-3001', []]
      }),
    })

    // return this.formMain = this._fb.group({
    //   id: [0, []],
    //   companyId: [localStorage.getItem("companyId"), [Validators.required]],
    //   userId: [localStorage.getItem("userId"), [Validators.required]],
    //   transporterId: [2 || '', [Validators.required]],
    //   subjectReason: ['Buscar Hd novo no fornecedor para upgrade em notebook do cliente.', [Validators.required, Validators.maxLength(150)]],
    //   contactName: ['Ellen', [Validators.required, Validators.maxLength(50)]],
    //   price: [22, [Validators.required]],
    //   collect: [true, []],
    //   deliver: [true, []],
    //   other: [false, []],
    //   taskOverView: ['HD Kingston SSD M2 1 TB novo', [Validators.required, Validators.maxLength(1000)]],
    //   billingFrom: this.subForm = this._fb.group({
    //     partnerId: [null, []],
    //     customerId: [808, []],
    //     base: [false, []]
    //   }),
    //   destiny: this.destiny = this._fb.group({
    //     customerId: [null, []],
    //     partnerId: [4, []],
    //     noRegisterName: [null, []],
    //     noRegisterAddress: [null, []]
    //   }),
    // })

  }

  save() {
    this.validatorLocal.removeValidatorsDestiny(this.destiny, ['customerId',  'partnerId',  'noRegisterName',  'noRegisterAddress']);
    this.validatorLocal.removeValidatorsPayment(this.subForm, ['customerId',  'partnerId']);

    if (this.alertSave(this.formMain)) {
      this.openDialogConfirmationPanel();
    }
  }


  ngOnInit(): void {
    this.formLoad();
    this.screen();
    this.validatorLocal.required(this.formMain, ['transporterId']);
    //this.validatorLocal.atLeastOneEntitySelectedDestiny(this.destiny, ['customerId',  'partnerId',  'noRegisterName',  'noRegisterAddress']);
    // this.validatorLocal.atLeastOneEntitySelectedPayment(this.subForm, ['customerId',  'partnerId']);

  }

}