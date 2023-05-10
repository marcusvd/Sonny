import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from "@angular/common/http";
import { Injectable, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { AddressDto, ViaCepDto } from "src/shared/dtos/address-dto";

@Injectable()
export class AddressService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }


  formLoaded(addr: AddressDto): FormGroup {
    return this.formMain = this._fb.group({
      zipcode: [addr.zipcode, [Validators.maxLength(150)]],
      street: [addr.street, [Validators.required, Validators.maxLength(150)]],
      number: [addr.number, [Validators.required, Validators.maxLength(15)]],
      district: [addr.district, [Validators.required, Validators.maxLength(150)]],
      city: [addr.city, [Validators.required, Validators.maxLength(150)]],
      state: [addr.state, [Validators.required, Validators.maxLength(3)]],
      complement: [addr.complement, [Validators.maxLength(500)]]
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


}
