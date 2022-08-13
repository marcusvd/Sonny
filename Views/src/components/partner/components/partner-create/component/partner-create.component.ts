import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
;
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { PartnerListService } from 'src/components/partner/services/partner-list.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PartnerCreateService } from '../services/partner-create.service';

@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent extends BaseForm implements OnInit {


  startDate = new Date(2021, 0, 1);

  constructor(
    private _FormBuilder: FormBuilder,
    private _PartnerCreateService: PartnerCreateService,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ButtonBack: NavBackService
  ) {
    super();
  }


  address($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }

  contact($event?: any) {
    const evt: FormGroup = $event;
    return evt;
  }


  formLoad() {
    this.formMain = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      today: ['', [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      responsible: ['', [Validators.required, Validators.maxLength(150), ]],
      businessline: ['', [Validators.required, Validators.maxLength(150)]],
      comments: ['', [Validators.maxLength(500)]],
      transporter: ['', []],
      address: this.contact(),
      contact: this.address()
    })
  }
  save() {
    this._PartnerCreateService.save(this.formMain);
  }
  ngOnInit(): void {
    this.formLoad();
  }

}
