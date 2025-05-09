import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { NgxMaskModule } from 'ngx-mask';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  standalone: true,
  imports: [
    CommonModule,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    NgxMaskModule
  ],
  providers: [
    AddressService,
  ]
})
export class AddressComponent implements OnInit {

  @Input() formMain: FormGroup;

  screenFieldPosition = "row";

  constructor(
    private _addressService: AddressService,
  ) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  query(cep: string) {
    this?._addressService?.query(cep);
  }

 
  ngOnInit(): void {

    this._addressService.formMain = this.formMain;

  }




}
