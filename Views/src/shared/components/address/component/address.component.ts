import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { AddressService } from '../services/address.service';
// import * as SimpleValidators from '../../../helpers/simple-validators';
// export {SimpleValidators}


@Component({
  selector: 'comp-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [AddressService]
})
export class AddressComponent implements OnInit {

  @Output() formLoad = new EventEmitter<FormGroup>();



  constructor(
    private _AddressService: AddressService,
  ) {


  }


  @Output() searchKey: EventEmitter<string> = new EventEmitter();


  get formMain() {
    return this._AddressService.formGet;
  }
  get validation() {
    return this._AddressService;
  }

  query(cep: string) {
    this._AddressService.query(cep);
  }

  get validator() {
    return this._AddressService;
  }

  ngOnInit(): void {

    // const test = ;
    this.formLoad.emit(this._AddressService.formLoad());
    // console.log(JSON.stringify(this._AddressService.formLoad()))

  }

}
