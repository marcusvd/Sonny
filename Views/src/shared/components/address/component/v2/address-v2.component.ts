import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AddressDto, ViaCepDto } from 'src/shared/dtos/address-dto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'address-v2',
  templateUrl: './address-v2.component.html',
  styleUrls: ['./address-v2.component.css'],
  providers: []
})
export class AddressV2Component extends BaseForm implements OnInit, OnChanges {

  @Input() address: AddressDto = null;

  districtCityStateCols: number = 3;
  districtCityStateRowHeight: string = '120px';

  streetNumberCols: number = 2;
  streetNumberRowHeight: string = '120px';

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  screen() {
    this.screenSize().subscribe({
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

  query(cep: string) {
    cep = cep.replace('.', '')
    cep = cep.replace('-', '')
    const cepClean = cep;
    var Url = (`//viacep.com.br/ws/${cepClean}/json`);
    //remove all characters that no be a number.
    cep = cep.replace(/\D/g, '');
    //check if the field are empty
    if (cep != "") {
      //check if number is valid
      var validationCep = /^[0-9]{8}$/;
    }
    if (validationCep?.test(cep)) {
      this._http.get(Url).subscribe((paramCep: any) => {
        this.seedForm(paramCep)
      });
    }
  }

  seedForm(cepParam: ViaCepDto) {
    this.formMain.controls['complement'].setValue(cepParam.complemento);
    this.formMain.controls['street'].setValue(cepParam.logradouro);
    this.formMain.controls['district'].setValue(cepParam.bairro);
    this.formMain.controls['city'].setValue(cepParam.localidade);
    this.formMain.controls['state'].setValue(cepParam.uf);
  }

  formLoaded(addr?: AddressDto): FormGroup {
    return this.formMain = this._fb.group({
      id: [addr?.id, [Validators.required]],
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

  // get formMain() {
  //   return this?._addressService?.formMain;
  // }

  // query(cep: string) {
  //   this?._addressService?.query(cep);
  // }
  getForm() {
    return this.formMain
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formLoaded(this.address)
  }


  ngOnInit(): void {
    // console.log(this?.user?.address)

  }

}
