import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { PartnerListService } from 'src/components/partner/services/partner-list.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PartnerCreateService } from '../services/partner-create.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent extends BaseForm implements OnInit {

  title: string = 'Parceiro';
  subTitle: string = 'Cadastro';

  startDate = new Date(2021, 0, 1);
  responsibleCnpjCols: number;
  responsibleCnpjRowHeight: string = '120px';

  todayBusinesslineCols: number;
  todayBusinesslineRowHeight: string = '160px';

  commentsCols: number;
  commentsRowHeight: string = '120px';

  constructor(
    private _FormBuilder: FormBuilder,
    private _partnerCreateService: PartnerCreateService,
    // private _SnackBar: MsgOperation,
    // private _Route: Router,
    private _contactService: ContactService,
    private _addressService: AddressService,
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
            this.responsibleCnpjCols = 1;
            this.todayBusinesslineCols = 1;
            this.commentsCols = 1;
            break;
          }
          case 'small': {
            this.responsibleCnpjCols = 1;
            this.todayBusinesslineCols = 1;
            this.commentsCols = 1;
            break;
          }
          case 'medium': {
            this.responsibleCnpjCols = 2;
            this.todayBusinesslineCols = 2
            this.commentsCols = 1;
            break;
          }
          case 'large': {
            this.responsibleCnpjCols = 2;
            this.todayBusinesslineCols = 2;
            this.commentsCols = 1;
            break;
          }
          case 'xlarge': {
            this.responsibleCnpjCols = 2;
            this.todayBusinesslineCols = 2;
            this.commentsCols = 1;
            break;
          }
        }
      }
    })




  }


  typeRegisterShowHide: boolean = false;
  typeOfRegister($event) {
    if ($event.value == 'basic') {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
    else {
      this.typeRegisterShowHide = !this.typeRegisterShowHide
    }
  }


  formLoad() {
    this.formMain = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      today: ['', [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      responsible: ['', [Validators.required, Validators.maxLength(150),]],
      businessLine: ['SELECIONE UMA OPÇÃO', [Validators.required, Validators.maxLength(150)]],
      comments: ['', [Validators.maxLength(500)]],
      // transporter: ['', []],
      address: this._contactService.formLoad(),
      contact: this._addressService.formLoad()
    })
  }
  save() {
    this._partnerCreateService.save(this.formMain);
  }
  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
