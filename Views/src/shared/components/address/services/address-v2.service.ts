import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClient } from "@angular/common/http";
import { Injectable, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddressDto, ViaCepDto } from "src/shared/dtos/address-dto";

@Injectable()
export class AddressV2Service {

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
  ) { }

  formMainLocal: FormGroup;

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
    this.formMainLocal.controls['complement'].setValue(cepParam.complemento);
    this.formMainLocal.controls['street'].setValue(cepParam.logradouro);
    this.formMainLocal.controls['district'].setValue(cepParam.bairro);
    this.formMainLocal.controls['city'].setValue(cepParam.localidade);
    this.formMainLocal.controls['state'].setValue(cepParam.uf);
  }

  save() {
    const formSave: AddressDto = { ...this.formMainLocal.value }
    return formSave
  }

  formLoaded(addr?: AddressDto): FormGroup {
    return this.formMainLocal = this._fb.group({
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
    return this.formMainLocal = this._fb.group({
      zipcode: ['', [Validators.maxLength(150)]],
      street: ['', [Validators.required, Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.maxLength(15)]],
      district: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      state: ['', [Validators.required, Validators.maxLength(3)]],
      complement: ['', [Validators.maxLength(500)]]
    });
  }




}
