import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { NgxMaskModule } from 'ngx-mask';


import { AddressService } from '../services/address.service';
import { BaseForm } from '../../inheritance/forms/base-form';

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
export class AddressComponent extends BaseForm implements OnInit {

  @Input() override formMain: FormGroup;

  constructor(
    private _addressService: AddressService,
  ) { super() }



  query(cep: string) {
    this?._addressService?.query(cep);
  }


  ngOnInit(): void {

    this._addressService.formMain = this.formMain;

  }




}
