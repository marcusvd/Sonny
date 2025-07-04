
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';


import { CustomerDto } from '../../../../../components/main/customer/components/commons-components/dtos/customer-dto';
import { PartnerDto } from "../../../../../components/main/partner/dtos/partner-dto";
import { CollectDeliverDto } from '../../../../../components/out-sourced/collect-deliver/dto/collect-deliver-dto';
import { BaseForm } from '../../../../../shared/components/inheritance/forms/base-form';
import { AddDefaultImports, AddDefaultProviders } from '../../../../imports/components-default.imports';
import { ConfirmDialogCollectDeliverComponent } from '../../commons-components/confirmation-panel-collect-deliver/confirm-dialog-collect-deliver.component';
import { CollectDeliverValidators } from '../../validators/collect-deliver-validators';
import { AddCollectDeliverImports, AddCollectDeliverProviders } from './imports/add-collect-deliver.imports';
import { AddCollectDeliverService } from '../../services/add-collect-deliver.service';
import { FormCollectDeliverService } from '../../services/form-collect-deliver.service';
import { AtLeastOneCollectDeliverOtherValidator } from '../../validators/at-least-one-collect-deliver-other.validator';
import { AtLeastOneDestinySelectedValidator } from '../../validators/at-least-one-destiny-selected.validator';
import { AtLeastOneBillingFromSelectedValidator } from '../../validators/at-least-one-billing-from-selected.validator';
import { DestinyDto } from '../../dto/destiny-dto';
import { BillingFromDto } from '../../dto/billing-from-dto';
import { PhysicallyMovingCostsDto } from 'src/components/main/inheritances/dtos/physically-moving-costs';



@Component({
  selector: 'add-collect-deliver',
  standalone: true,
  templateUrl: './add-collect-deliver.component.html',
  styleUrls: ['./add-collect-deliver.component.css'],
  imports: [
    AddDefaultImports,
    AddCollectDeliverImports,
  ],
  providers: [
    AddDefaultProviders,
    AddCollectDeliverProviders
  ],
})
export class AddCollectDeliverComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _createService: AddCollectDeliverService,
    private _formService: FormCollectDeliverService,
    private _dialog: MatDialog,
  ) { super() }


  private valLocal = CollectDeliverValidators;
  get validatorLocal() {
    return this.valLocal
  }

  entities: string[] = ['Clientes', 'Parceiros', 'Outros'];
  entitiesToPayment: string[] = ['Clientes', 'Parceiros'];
  transportOptions: string[] = ['Combustível', 'Aplicativo', 'MotoBoy', 'Transporte publico'];
  destiny: FormGroup;
  selectedEntityToPayment: string = 'Clientes';
  selectedNameEntityToPay: string;
  selectedEntityTypeToPay: string;
  selectedDestiny: string = 'Clientes';
  selectedTransporter: PartnerDto;
  selectedCustomerDestiny: CustomerDto;
  selectedPartnerDestiny: PartnerDto;
  selectedCustomerPayment: CustomerDto | null;
  selectedPartnerPayment: PartnerDto | null;
  disablePaymentDestiny: boolean = false;
  cleanEntity: boolean = false;

  // onCollectChecked = (selected: MatCheckboxChange) =>
  //   selected.checked == true ? this.formMain.get('collect')?.setValue(new Date()) : this.formMain.get('collect')?.setValue(this.minValue);

  // onDeliveryChecked = (selected: MatCheckboxChange) =>
  //   selected.checked == true ? this.formMain.get('deliver')?.setValue(new Date()) : this.formMain.get('deliver')?.setValue(this.minValue);

  // onOtherChecked = (selected: MatCheckboxChange) =>
  //   selected.checked == true ? this.formMain.get('other')?.setValue(new Date()) : this.formMain.get('other')?.setValue(this.minValue);




  // onCheckedCollectDeliveryOther(selected: MatCheckboxChange) {
  //   selected.checked == true ? this.formMain.get(selected.source.name)?.setValue(new Date()) : this.formMain.get(selected.source.name)?.setValue(this.minValue);
  // }






  onSelectedRadioDestiny(selected: MatRadioChange) {
    const selectedEntity = selected;
    this.selectedDestiny = selectedEntity.value;
    if (selectedEntity.value === 'Clientes') {
      this.destiny.get('partnerId')?.setValue(null);
      this.destiny.get('noRegisterName')?.setValue(null);
      this.destiny.get('noRegisterAddress')?.setValue(null);
    }

    if (selectedEntity.value === 'Parceiros') {
      this.destiny.get('customerId')?.setValue(null);
      this.destiny.get('noRegisterName')?.setValue(null);
      this.destiny.get('noRegisterAddress')?.setValue(null);
    }

    if (selectedEntity.value === 'Outros') {
      this.destiny.get('customerId')?.setValue(null);
      this.destiny.get('partnerId')?.setValue(null);
    }

  }

  atLeastOneSelected = (): boolean => this.destiny.get('partnerId')?.value != null || this.destiny.get('customerId')?.value != null || (this.destiny.get('noRegisterName')?.value && this.destiny.get('noRegisterAddress')?.value);
  atLeastOnePayerSelected = (): boolean => this.selectedCustomerPayment ?? this.selectedPartnerPayment ?? this.subForm.get('base').value;

  onTransporterSelected(partner: PartnerDto) {
    this.selectedTransporter = partner;
    // this.formMain.get('transporterId')?.setValue(this.selectedTransporter.id)
  }


  onCustomerSelectedDestiny(value: CustomerDto) {
    this.selectedCustomerDestiny = value;
  }


  onPartnerSelectedDestiny(value: PartnerDto) {
    this.selectedPartnerDestiny = value;
  }


  onCustomerSelectedPayment(value: CustomerDto) {
    this.selectedCustomerPayment = value;
  }


  onPartnerSelectedPayment(value: PartnerDto) {
    this.selectedPartnerPayment = value;
  }

  onPriceSelectedPayment(typeTransporte: string) {

    const transportMap: Record<string, { key: keyof PhysicallyMovingCostsDto, label: string }> = {
      'Combustível': { key: 'fuel', label: 'Combustível' },
      'Aplicativo': { key: 'apps', label: 'Aplicativo' },
      'MotoBoy': { key: 'motoBoy', label: 'MotoBoy' },
      'Transporte publico': { key: 'publicTransport', label: 'Transporte publico' },
    }

    const selected = transportMap[typeTransporte];

    if (!selected) return;

    const price = this.selectedCustomerPayment?.physicallyMovingCosts?.[selected.key]
      ??
      this.selectedPartnerPayment?.physicallyMovingCosts?.[selected.key]
      ??
      0;

    this.formMain.patchValue({
      price,
      kindTransport: selected.label
    })

  }


  openDialogConfirmationPanel(): void {
    const dialogRef = this._dialog.open(ConfirmDialogCollectDeliverComponent, {
      // width: '750px',
      // height: '750px',
      data: {
        title: 'Tudo Certo?',
        subject: this?.formMain?.get('subjectReason')?.value,
        price: this?.formMain?.get('price')?.value,
        contact: this?.formMain?.get('contactName')?.value,
        collect: this?.formMain?.get('collect')?.value === true ? 'Sim' : 'Não',
        deliver: this?.formMain?.get('deliver')?.value === true ? 'Sim' : 'Não',
        other: this?.formMain?.get('other')?.value === true ? 'Sim' : 'Não',
        itemsOrService: this?.formMain?.get('taskOverView')?.value,
        destiny: this?.selectedCustomerDestiny?.name ?? this?.selectedPartnerDestiny?.name ?? (this?.destiny?.get('noRegisterName')?.value && this?.destiny?.get('noRegisterAddress')?.value),
        transporter: this?.selectedTransporter?.name,
        payer: this?.selectedCustomerPayment?.name ?? this?.selectedPartnerPayment?.name ?? 'Custo Local'
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

  localCostToPayment($event: MatRadioButton) {

    if ($event.checked) {
      this.subForm.get('customerId')?.setValue(null);
      this.subForm.get('partnerId')?.setValue(null);
      this.subForm.get('base')?.setValue(true);
      this.formMain.get('kindTransport')?.setValue('Combustível');
      this.formMain.get('price')?.setValue(0);
      this.selectedCustomerPayment = null;
      this.selectedPartnerPayment = null;
    }
    else {
      // this?.destiny?.get('customerId')?.setValue(null);
      // this?.destiny?.get('PartnerId')?.setValue(null);
      this?.subForm?.get('base')?.setValue(false);
      this?.formMain?.get('price')?.setValue(0);
      // this.selectedCustomerDestiny = new CustomerDto();
      // this.selectedPartnerDestiny = new PartnerDto();
      this.cleanEntity = !this?.cleanEntity;
    }

    this.disablePaymentDestiny = !this.disablePaymentDestiny;
  }

  onSelectedRadioPayment(selected: MatRadioButton) {

    const selectedEntity = selected;
    if (selectedEntity.value === 'Clientes') {
      this.subForm.get('partnerId')?.setValue(null);
      this.selectedPartnerPayment = null;
      this.formMain.get('price')?.setValue(0);
    }

    if (selectedEntity.value === 'Parceiros') {
      this.subForm.get('customerId')?.setValue(null);
      this.selectedCustomerPayment = null;
      this.formMain.get('price')?.setValue(0);
    }

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

    // this.validatorLocal.removeValidatorsDestiny(this.destiny, ['customerId', 'partnerId', 'noRegisterName', 'noRegisterAddress']);
    // this.validatorLocal.removeValidatorsPayment(this.subForm, ['customerId', 'partnerId', 'base']);

    if (this.alertSave(this.formMain))
      this.openDialogConfirmationPanel();

  }

  ngOnInit(): void {
    this.formMain = this._formService.formLoad(false);
    this.destiny = this.formMain.get('destiny') as FormGroup;
    this.subForm = this.formMain.get('billingFrom') as FormGroup;
  }

}
