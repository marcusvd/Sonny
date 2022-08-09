import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { PartnerDto } from 'src/app/_components/administrative/local/out-sourced/dto/partner-dto';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/app/_shared/services/navigation/nav-back.service';
import { PartnerListService } from '../services/partner-list.service';
import { AddressService } from 'src/app/_shared/components/address/services/address.service';
import { ContactService } from 'src/app/_shared/components/contact/services/contact.service';

@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css']
})
export class PartnerCreateComponent implements OnInit {

  public _formPartner: FormGroup;

  startDate = new Date(2021, 0, 1);

  constructor(
    private _FormBuilder: FormBuilder,
    private _Addr: AddressService,
    private _CntValService: ContactService,
    private _Crud: PartnerListService,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,
    public _ButtonBack: NavBackService
  ) {}

  save() {
    if (this._formPartner.valid) {
      const _Partner: PartnerDto = { ...this._formPartner.value };
      this._Crud.add$(_Partner).subscribe((Partner: PartnerDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${_Partner.name} ${_Partner.businessline}`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formPartner);
        this._Route.navigate(['partners']);
      })
    }
  }

  _makerFormValidation() {
    this._formPartner = this._FormBuilder.group({
      name: ['', []],
      today: ['', []],
      cnpj: ['', []],
      responsible: ['', []],
      businessline: ['', []],
      comments: ['', []],
      address: this._Addr.AddressForm(),
      contact: this._CntValService.ContactForm(),
    })
  }

  ngOnInit(): void {
    this._makerFormValidation();
  }

}
