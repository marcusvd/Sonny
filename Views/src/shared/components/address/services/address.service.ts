import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ViaCepDto } from "../../table-g/dtos/address-dto";

@Injectable()

export class AddressService {
  private _addressForm: FormGroup;
  //length of min or max
  private _characters: string = ' caracteres.';
  private _length: number;
  private _controlName: string;
  private _minLength: string = 'Preenchimento, mínimo de pelo menos ';
  private _maxLength: string = 'Preenchimento não pode ultrapassar ';
  private _required: string = ' é de preenchimento obrigatório.';

  constructor(
    private _FormBuilder: FormBuilder,
    private _Http: HttpClient,
  ) { }

  AddressForm(): FormGroup {
    return this._addressForm = this._FormBuilder.group({
      zipcode: ['', [Validators.maxLength(150)]],
      street: ['', [Validators.required, Validators.maxLength(150)]],
      number: ['', [Validators.required, Validators.maxLength(15)]],
      district: ['', [Validators.required, Validators.maxLength(150)]],
      city: ['', [Validators.required, Validators.maxLength(150)]],
      state: ['', [Validators.required, Validators.maxLength(150)]],
      complement: ['', [Validators.maxLength(500)]]
    });
  };

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
  get addressFormMainGet(){
    return this._addressForm
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
    //  this._Addr._addressForm.controls['number'].setValue(cepParam.);
    //   this._Addr._addressForm.controls['zipcode'].setValue(cepParam.cepParam);
    this._addressForm.controls['complement'].setValue(cepParam.complemento);
    this._addressForm.controls['street'].setValue(cepParam.logradouro);
    this._addressForm.controls['district'].setValue(cepParam.bairro);
    this._addressForm.controls['city'].setValue(cepParam.localidade);
    this._addressForm.controls['state'].setValue(cepParam.uf);

  }









}
