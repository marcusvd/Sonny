import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatSelect } from "@angular/material/select";


import { BaseForm } from "src/shared/helpers/forms/base-form";
import { IScreen } from "src/shared/helpers/responsive/iscreen";
import { ValidatorMessages } from "src/shared/helpers/validators/validators-messages";
import { ToolTips } from "src/shared/services/messages/snack-bar.service";
import { PartnerCreateService } from "../../add/services/partner-create.service";


@Component({
  selector: 'business-line',
  templateUrl: './business-line.component.html',
  styles: [`

  `]
})
export class BusinessLineComponent extends BaseForm implements OnInit {


  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _partnerCreateService: PartnerCreateService,
  ) {
    super(_breakpointObserver)
  }

  @Input() override formMain: FormGroup;

  get businesslineArray(): any[] {
    return this._partnerCreateService.businesslineArray
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  messageTooltipBusinessLineOther = 'Para um novo segmento, selecione "OUTROS" no menu esquerdo.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  disabledBusinessLineFromControl() {

    this.formMain.get('businessLineOther').reset();
    this.formMain.controls['businessLineOther'].disable();
    this.matTooltip.enableDisable = false;

  }

  enabledBusinessLineFromControl() {

    this.formMain.controls['businessLineOther'].enable();
    this.matTooltip.enableDisable = true;

  }


  businessLine(businessLine: string) {

    const value = businessLine;

    if (value.toLocaleLowerCase() === 'outros')
      this.enabledBusinessLineFromControl()
    // {
    //   this.formMain.controls['businessLineOther'].enable();
    //   this.matTooltip.enableDisable = true;
    // }

    else
      this.disabledBusinessLineFromControl();
    // {
    //   this.formMain.get('businessLineOther').reset();
    //   this.formMain.controls['businessLineOther'].disable();
    //   this.matTooltip.enableDisable = false;
    // }

    this.businessLineSetForm(value);

  }

  addValidation(crtl: string) {
    this.formMain.get(crtl).addValidators([Validators.required]);
    this.formMain.get(crtl).updateValueAndValidity();
  }
  removeValidation(crtl: string) {
    this.formMain.get(crtl).removeValidators([Validators.required]);
    this.formMain.get(crtl).updateValueAndValidity();
  }


  businessLineSetForm(businessLine: string) {

    const value = businessLine;

    switch (value) {
      case 'MOTOBOY / TRANSPORTADOR':
        //transporter
        this.formMain.get('partnerBusiness').setValue(0);
        this.removeValidation('businessLineOther');
        break;

      case 'FORNECEDOR HARDWARE':
        //hardwareSupplier
        this.formMain.get('partnerBusiness').setValue(1);
        this.removeValidation('businessLineOther');
        break;

      case 'REPARO NOTEBOOKS':
        //ElectronicRepair
        this.formMain.get('partnerBusiness').setValue(2);
        this.removeValidation('businessLineOther');
        break;

      case 'REPARO ELETÔNICA GERAL':
        //ElectronicRepair
        this.formMain.get('partnerBusiness').setValue(2);
        this.removeValidation('businessLineOther');
        break;

      default:
        //Others
        this.formMain.get('partnerBusiness').setValue(3);
        this.addValidation('businessLineOther');
        // this.formMain.get('businessLineOther').addValidators([Validators.required]);
        // this.formMain.get('businessLineOther').updateValueAndValidity();
        break;
    }

  }




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

  ngOnInit(): void {
  }

}
