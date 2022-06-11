import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AddressDto, ViaCepDto } from '../../dtos/address-dto';
import { ValidatorsService } from '../../helpers/validators.service';
import { AddressValidatorsService } from './services/address-validators.service';

@Component({
  selector: 'comp-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public _address: AddressDto = new AddressDto();



  constructor(
    public _ValidationMsg: ValidatorsService,
    public _AddressValidatorsService: AddressValidatorsService,
    public _Http: HttpClient,
  ) {
    this._AddressValidatorsService.AddressForm();
  }

  query(cep: string) {

    var Url = (`//viacep.com.br/ws/${cep}/json`);
    //remove all characters that no be a number.
    cep = cep.replace(/\D/g, '');
    //check if the field are empty
    if (cep != "") {
      //check if number is valid
      var validationCep = /^[0-9]{8}$/;
    }
    if (validationCep.test(cep)) {
      this._Http.get(Url).subscribe((paramCep: any) => {
        this.seedForm(paramCep)
      });
    }
  }
  seedForm(cepParam: ViaCepDto) {

  //  this._Addr._addressForm.controls['number'].setValue(cepParam.);
  //   this._Addr._addressForm.controls['zipcode'].setValue(cepParam.cepParam);
    this._AddressValidatorsService._addressForm.controls['complement'].setValue(cepParam.complemento);
    this._AddressValidatorsService._addressForm.controls['street'].setValue(cepParam.logradouro);
    this._AddressValidatorsService._addressForm.controls['district'].setValue(cepParam.bairro);
    this._AddressValidatorsService._addressForm.controls['city'].setValue(cepParam.localidade);
    this._AddressValidatorsService._addressForm.controls['state'].setValue(cepParam.uf);

  }







  ngOnInit(): void {

  }

}
