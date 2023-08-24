import { Component, OnInit, Output } from '@angular/core';
import { AddressService } from '../services/address.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: []
})
export class AddressComponent implements OnInit {

  screenFieldPosition = "row";
  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _addressService: AddressService,
  ) { }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  get formMain() {
    return this?._addressService?.formMain;
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

  }

}
