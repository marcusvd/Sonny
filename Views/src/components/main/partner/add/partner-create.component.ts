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


  typeRegisterShowHide: boolean = false;
  typeOfRegister($event: any) {
    if ($event.value == 'basic') {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
    else {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
  }

  businessLine(value: string) {
    const selected = value;
    if (selected.toLocaleLowerCase() === 'outros') {
      this.formMain.controls['businessLineOther'].enable();
      this.matTooltip.enableDisable = true;
    }
    else if (selected.toLocaleLowerCase() != 'outros') {
      this.formMain.get('businessLineOther').reset();
      this.formMain.controls['businessLineOther'].disable();
      this.matTooltip.enableDisable = false;
    }
    this.businessLineSetForm(value)
  }

  businessLineSetForm(value: string) {
    switch (value) {
      case 'MOTOBOY':
        this.formMain.get('partnerType').setValue(0);
        console.log()
        break;
      case 'FORNECEDOR HARDWARE':
        this.formMain.get('partnerType').setValue(1);
        break;
      case 'REPARO NOTEBOOKS':
        this.formMain.get('partnerType').setValue(2);
        console.log()
        break;
      default:
        this.formMain.get('partnerType').setValue(3);
        console.log()
        break;
    }
  }


  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      registered: [new Date(), [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
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
