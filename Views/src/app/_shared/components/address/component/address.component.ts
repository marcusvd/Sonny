import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AddressDto, ViaCepDto } from '../../../dtos/address-dto';
import { ValidatorsService } from '../../../helpers/form-validators.service';
import { AddressService } from '../services/address.service';


@Component({
  selector: 'comp-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers:[AddressService]
})
export class AddressComponent implements OnInit {

  constructor(
    private _AddressService: AddressService,
  ) {
  }

  get formMain() {
    return this._AddressService.addressFormMainGet;
  }

  query(cep: string) {
    this._AddressService.query(cep);
  }

  commonFields(ctrl: string, msgMin: string, msgMax: string, form: FormGroup) {
    this._AddressService.commonFields(ctrl,msgMin,msgMax,form);
  }

  ngOnInit(): void {
    this._AddressService.AddressForm();
  }

}
