import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AddressService } from '../services/address.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/shared/modules/material.module';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // MaterialModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule

  ],
  providers: [
    AddressService,
  ]
})
export class AddressComponent implements OnInit, OnChanges {

  @Input() formMain: FormGroup;

  screenFieldPosition = "row";

  constructor(
    private _addressService: AddressService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formMain)
  }

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
