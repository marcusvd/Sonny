import { Component, Input, OnInit, Output } from '@angular/core';
import { AddressService } from '../services/address.service';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: []
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

  // get formMain() {
  //   return this?._addressService?.formMain;
  // }

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

    // do {
    //   this?._addressService?.query(this.formMain.get('zipcode').value)
    // } while (this.formMain.get('zipcode').value == null)


  }

}
