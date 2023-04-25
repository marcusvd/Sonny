import { Component, Input, OnInit, Output } from '@angular/core';

import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { AddressService } from '../../services/address.service';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AddressDto } from 'src/shared/dtos/address-dto';

@Component({
  selector: 'address-v2',
  templateUrl: './address-v2.component.html',
  styleUrls: ['./address-v2.component.css'],
  providers: []
})
export class AddressV2Component extends BaseForm implements OnInit {

  @Input() user: MyUser = undefined;

  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _addressService: AddressService,
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder,
  ) { super(_breakpointObserver) }

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
            this.districtCityStateCols = 1;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 1;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'small': {
            this.districtCityStateCols = 1;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 1;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'medium': {
            this.districtCityStateCols = 2;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'large': {
            this.districtCityStateCols = 3;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
          case 'xlarge': {
            this.districtCityStateCols = 3;
            this.districtCityStateRowHeight = '120px';
            this.streetNumberCols = 2;
            this.streetNumberRowHeight = '120px';
            break;
          }
        }
      }
    })




  }


  formLoaded(addr?: AddressDto): FormGroup {
    return this.formMain = this._fb.group({
      zipcode: [addr?.zipcode, [Validators.maxLength(150)]],
      street: [addr?.street, [Validators.required, Validators.maxLength(150)]],
      number: [addr?.number, [Validators.required, Validators.maxLength(15)]],
      district: [addr?.district, [Validators.required, Validators.maxLength(150)]],
      city: [addr?.city, [Validators.required, Validators.maxLength(150)]],
      state: [addr?.state, [Validators.required, Validators.maxLength(3)]],
      complement: [addr?.complement, [Validators.maxLength(500)]]
    });
  }
  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      zipcode: ['', [Validators.maxLength(150)]],
      street: ['', [Validators.required, Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.maxLength(15)]],
      district: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      state: ['', [Validators.required, Validators.maxLength(3)]],
      complement: ['', [Validators.maxLength(500)]]
    });
  }


  ngOnInit(): void {
    this.formLoaded(this.user.address);
  }

}
