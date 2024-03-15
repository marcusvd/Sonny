import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustomer } from '../../customer/validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../customer/validators/customer/validators-messages-customer';
import { CpfCnpjValidator } from 'src/shared/helpers/validators/cpf-cnpj.validator';

@Component({
  selector: 'main-entities-base',
  templateUrl: './main-entities-base.component.html',
  styleUrls: ['./main-entities-base.component.css']
})
export class MainEntitiesBaseComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;
  @Input() businessLine: boolean = false;
  // @Input() entityType: string = '';

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }



  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
  }

  ngOnInit(): void {
  }

}
