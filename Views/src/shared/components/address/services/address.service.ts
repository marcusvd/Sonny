import { HttpClient } from "@angular/common/http";
import { Injectable, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BaseForm } from "src/shared/helpers/forms/base-form";
import { ViaCepDto } from "../../table-g/dtos/address-dto";

@Injectable()

export class AddressService extends BaseForm {

  constructor(
    private _Fb: FormBuilder,
    private _Http: HttpClient,
  ) { super() }

   formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      zipcode: ['', [Validators.maxLength(150)]],
      street: ['', [Validators.required, Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.maxLength(15)]],
      district: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      state: ['', [Validators.required, Validators.maxLength(3)]],
      complement: ['', [Validators.maxLength(500)]]
    });
  };

  get formGet() {
    return this.formMain
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
      this._Http.get(Url).subscribe((paramCep: any) => {
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




  // AddressEdit(): FormGroup {
  //   return this._addressForm = this._FormBuilder.group({
  //     id: ['', []],
  //     zipcode: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     street: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     number: ['', [Validators.minLength(2), Validators.maxLength(15)]],
  //     district: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     city: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     state: ['', [Validators.minLength(2), Validators.maxLength(150)]],
  //     complement: ['', [Validators.minLength(2), Validators.maxLength(500)]]
  //   });
  // };
}