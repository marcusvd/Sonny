import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';
import { PartnerCreateService } from './services/partner-create.service';
import { TypePartnerEnumDto } from '../dto/enums/type-partner-enum-dto';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';

@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent extends BaseForm implements OnInit {

  messageTooltipBusinessLineOther = 'Para um novo segmento, selecione "OUTROS" no menu esquerdo.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  // title: string = "transfer_within_a_station";
  // subTitle: string = 'Cadastrar Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';


  startDate = new Date(2021, 0, 1);

  constructor(
    private _fb: FormBuilder,
    private _partnerCreateService: PartnerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  defaultSelectedbusinessline = 'MENSAL';
  get businesslineArray(): any[] {
    return this._partnerCreateService.businesslineArray
  }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            break;
          }
        }
      }
    })




  }


  typeRegisterShowHide: boolean = false;
  typeOfRegister($event: any) {
    if ($event.value == 'basic') {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
    else {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
  }


  businessLine(businessLine: string) {
    console.log(businessLine)
    const value = businessLine;

    if (value.toLocaleLowerCase() === 'outros') {
      this.formMain.controls['businessLineOther'].enable();
      this.matTooltip.enableDisable = true;
    }

    else if (value.toLocaleLowerCase() != 'outros') {
      this.formMain.get('businessLineOther').reset();
      this.formMain.controls['businessLineOther'].disable();
      this.matTooltip.enableDisable = false;
    }

    this.businessLineSetForm(value);

  }

  businessLineSetForm(businessLine: string) {



    const value = businessLine;

    switch (value) {
      case 'MOTOBOY / TRANSPORTADOR':
        //transporter
        this.formMain.get('partnerType').setValue(0);
        break;

      case 'FORNECEDOR HARDWARE':
        //hardwareSupplier
        this.formMain.get('partnerType').setValue(1);
        break;

      case 'REPARO NOTEBOOKS':
        //ElectronicRepair
        this.formMain.get('partnerType').setValue(2);
        break;

      case 'REPARO ELETÔNICA GERAL':
        //ElectronicRepair
        this.formMain.get('partnerType').setValue(2);
        break;

      default:
        //Others
        this.formMain.get('partnerType').setValue(3);
        break;
    }
  }


  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      registered: [new Date(), [Validators.required]],
      cnpj: ['', [Validators.required]],
      responsible: ['', [Validators.required, Validators.maxLength(100),]],
      businessLine: ['SELECIONE UMA OPÇÃO', [Validators.required, Validators.maxLength(100)]],
      partnerType: ['', []],
      businessLineOther: new FormControl({ value: '', disabled: true }),
      description: ['', [Validators.maxLength(500)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad()
    })
  }

  save() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção') {
      this.formMain.get('businessLine').setErrors({ changeOpt: true })
    }

    if (this.alertSave(this.formMain)) {
      this._partnerCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
    // this.matTooltip.enableDisable = false;
  }

}
