import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule as MatInputModule } from '@angular/material/input';


import { NgxMaskModule } from 'ngx-mask';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
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

  screen() {
    this._addressService.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column";
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column";
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row";
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row";
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row";
            break;
          }
        }
      }
    })




  }

  ngOnInit(): void {

    this._addressService.formMain = this.formMain;

  }




}
