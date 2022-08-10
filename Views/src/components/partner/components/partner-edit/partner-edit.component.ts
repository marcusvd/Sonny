import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PartnerDto } from 'src/components/partner/dto/partner-dto';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { PartnerListService } from '../../services/partner-list.service';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { ContactService } from 'src/shared/components/contact/services/contact.service';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit {

  public _formPartner: FormGroup;
  public _partner: PartnerDto;

  startDate = new Date(2021, 0, 1);

  constructor(
    private _ActRoute: ActivatedRoute,
    private _Route: Router,
    private _FormBuilder: FormBuilder,
    private _Addr: AddressService,
    private _CntValService: ContactService,
    private _Crud: PartnerListService,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
    public _ButtonBack: NavBackService,
  ) { }

  loadFormData(partner: PartnerDto) {
    this._formPartner.patchValue(partner)
    if(partner.contact.socialnetworks != null){

      partner.contact.socialnetworks.forEach((snw) => {
        this._CntValService.socialNets.push(this._CntValService.SocialNetworkValidators())
      })

    }
  }

  save() {
    let _updatePartner: PartnerDto = { ... this._formPartner.value }
    //console.log(_updatePartner);
    this._Crud.update$<PartnerDto>(_updatePartner).subscribe((updatedPartner: PartnerDto) => {
      this._SnackBar.msgCenterTop(`Parceiro ${_updatePartner.name} ${_updatePartner.businessline}`, 2, 5);
      //  this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formPartner);
      this._Route.navigate(['/partner', updatedPartner.id, 'edit']);
    });
  }

  _makerFormValidation(partner: PartnerDto) {
    this._formPartner = this._FormBuilder.group({
      id: ['', []],
      name: ['', []],
      today: ['', []],
      cnpj: ['', []],
      responsible: ['', []],
      businessline: ['', []],
      comments: ['', []],
      // address: this._Addr.AddressEdit(),
      contact: this._CntValService.ContactForm(),
    })
    this.loadFormData(partner);
  }

  ngOnInit(): void {
    this._ActRoute.data.subscribe(
      (item: { Partneredit: PartnerDto }) => {
        this._partner = item.Partneredit;
        this._makerFormValidation(item.Partneredit);
        //this.loadFormData(item.Partneredit);
      });
  }

}
