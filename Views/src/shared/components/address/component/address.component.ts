import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleValidators } from 'src/shared/helpers/simple-validators';
import { AddressDto, ViaCepDto } from '../../../dtos/address-dto';
import { AddressService } from '../services/address.service';
// import * as SimpleValidators from '../../../helpers/simple-validators';
// export {SimpleValidators}


@Component({
  selector: 'comp-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [AddressService]
})
export class AddressComponent implements OnInit {

  // validator: SimpleValidators;

  constructor(
    private _AddressService: AddressService,
    private _SimpleValidatorService: SimpleValidators,
  ) {
    //this.validator
  }

  get formMain() {
    return this._AddressService.addressFormMainGet;
  }

  query(cep: string) {
    this._AddressService.query(cep);
    this.validator.commonFields
  }

  get validator(){
    return this._SimpleValidatorService
  }


  ngOnInit(): void {
    this._AddressService.AddressForm();
  }

}
