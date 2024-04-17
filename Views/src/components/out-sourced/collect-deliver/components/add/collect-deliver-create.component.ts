import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioChange, MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CollectDeliverDto } from 'src/components/out-sourced/collect-deliver/components/dto/collect-deliver-dto';
import { GetCustomerMatSelectSingleComponent } from 'src/shared/components/get-entities/get-customer-mat-select-single.component';
import { GetPartnerMatSelectSingleComponent } from 'src/shared/components/get-entities/get-partner-mat-select-single.component';
import { GetTransporterMatSelectSingleComponent } from 'src/shared/components/get-entities/get-transporter-mat-select-single.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { SubjectPriceContactComponent } from '../../commons-components/subject-price-contact.component';
import { CustomersService } from '../../services/customers.service';
import { PartnerService } from '../../services/partner.service';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { OthersDestiniesComponent } from '../../commons-components/other-form/others-destinies.component';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BtnSaveGComponent } from 'src/shared/components/btn-save-g/btn-save-g.component';

@Component({
  selector: 'collect-deliver-create',
  standalone: true,
  imports: [
    MatSelectModule,
    NgxMatSelectSearchModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
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
  providers: [CustomersService, PartnerService],
})
export class CollectDeliverCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  ngAfterViewInit(): void {

  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // selectedEntity: string;
  entities: string[] = ['Clientes', 'Parceiros', 'Outros'];
  entitiesToPayment: string[] = ['Clientes', 'Parceiros'];
  screenFieldPosition: string = 'column';
  screenFieldPositionSub: string = 'row';
  checkBoxAlign: string = 'center'
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';

            break;
          }
          case 'small': {
            this.checkBoxAlign = 'start';
            this.screenFieldPosition = 'column';
            this.screenFieldPositionSub = 'row';

            break;
          }
          case 'medium': {
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';

            break;
          }
          case 'large': {
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';

            break;
          }
          case 'xlarge': {
            this.checkBoxAlign = 'center';
            this.screenFieldPosition = 'row';
            this.screenFieldPositionSub = 'row';

            break;
          }
        }
      }
    })
  }

  selectedDestiny: string = 'Clientes';
  onSelected(selected: MatRadioChange) {
    const selectedEntity = selected;
    this.selectedDestiny = selectedEntity.value;
    if (selectedEntity.value === 'Clientes')
      this.destiny.get('partnerId').setValue(null);

    if (selectedEntity.value === 'Parceiros')
      this.destiny.get('customerId').setValue(null);


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

    console.log(selected)
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
        partnerId: [entity?.billingFrom?.partnerId || null, []],
        customerId: [entity?.billingFrom?.customerId || null, []],
        base: [entity?.billingFrom?.base || true, []]
      }),
      destiny: this.destiny = this._fb.group({
        customerId: [entity?.destiny?.customerId || null, []],
        partnerId: [entity?.destiny?.partnerId || null, []],
        noRegisterName: [entity?.destiny?.noRegisterName || null, []],
        noRegisterAddress: [entity?.destiny?.noRegisterAddress || null, []]
      }),
    })
  }

  save() {

  }


  ngOnInit(): void {
    this.formLoad();
    this.screen();

  }

}
