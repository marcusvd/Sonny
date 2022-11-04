import { Component, OnInit, Output } from '@angular/core';
import { AddressService } from '../services/address.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: []
})
export class AddressComponent implements OnInit {

  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _addressService: AddressService,
  ) { }


  get formMain() {
    return this?._addressService?.formMain;
  }

  query(cep: string) {
    this?._addressService?.query(cep);
  }

  required(form, ctrl, ctrlToShow) {
    return this?._addressService?.required(form, ctrl, ctrlToShow);
  }

  minMaxLength(form, ctrl, ctrlToShow, lengthMin, lengthMax) {
    return this?._addressService?.minMaxLength(form, ctrl, ctrlToShow, lengthMin, lengthMax);
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

  ngOnInit(): void {

  }

}
