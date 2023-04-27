import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AddressDto, ViaCepDto } from 'src/shared/dtos/address-dto';
import { AddressV2Service } from '../../services/address-v2.service';

@Component({
  selector: 'address-v2',
  templateUrl: './address-v2.component.html',
  styleUrls: ['./address-v2.component.css'],
  providers: []
})
export class AddressV2Component implements OnInit {

  @Input() user: MyUser = undefined;


  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _addressService: AddressV2Service,
    private _fb: FormBuilder,
  ) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
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

  get formMain() {
    return this?._addressService?.formMain;
  }

  query(cep: string) {
    this?._addressService?.query(cep);
  }


  ngOnInit(): void {
   // console.log(this?.user?.address)

  }

}
