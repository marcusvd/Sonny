import { Component, Inject, OnInit } from "@angular/core";
import { AddressDto } from "src/app/_shared/dtos/address-dto";
import { ContactDto } from "src/app/_shared/dtos/contact-dto";

import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidatorsService } from '../../../../_shared/helpers/validators.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { environment } from "src/environments/environment";
//import { ClientCrudService } from "../services/client-create-crud.service";
import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { ContactValidatorsService } from "src/app/_shared/components/contact/services/contact-validators.service";



@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
  providers: [ValidatorsService]
})

export class ClientEditComponent implements OnInit {

  private readonly _API_URL_CLIENT: string = `${environment._CLIENTS}`

  public _clientForm: FormGroup;
  public _client: ClientDto = new ClientDto();
  public _data: ClientDto = new ClientDto();
  public _assured: boolean = false;
  //  public _IsZap: boolean = false;
  public _arrayOfTypes: string[];
  public _types: string;

  //public _nameValidator: string;
  //   public _sizeString: number;



  constructor(
    private _Fb: FormBuilder,
   // private _Crud: ClientCrudService,
    public _Addr: AddressValidatorsService,
    private _CntValService: ContactValidatorsService,
    public _ValidationMsg: ValidatorsService,
    private _SnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ClientDto

  ) {
    this._clientForm = this.Validation();
  }

  refresh(): void {
    window.location.reload();
  }

  save() {
    //Client
    this._client = Object.assign({}, this._clientForm.value);
    this._client.id = this.data.id;

    // this._Crud.update$<ClientDto>(this._client).subscribe(

    //   (client: ClientDto) => {

    //   });

    this.refresh();
    this._SnackBar.open('Atualizado com ??xito.', '', { duration: 10000 });
  }

  CBoxAssured() {
    if (this.data.assured) {
      this._assured = true;
    }
  }

  DropDownType() {
    if (this.data.clienttype == "PF") {
      this._types = 'PF';
    }
    else {
      this._types = 'PJ';
    }
  }

  Validation(): FormGroup {
    return this._clientForm = this._Fb.group({
      id:[],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
      cnpj: ['', [Validators.minLength(11), Validators.maxLength(25)]],
      responsible: ['', [Validators.minLength(2), Validators.maxLength(15)]],
      clienttype: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      assured: ['', []],
      payment: ['', [Validators.minLength(3), Validators.maxLength(15)]],
      address: this._Addr.AddressForm(),
      contact: this._CntValService.ContactForm()
    });
  }



  ngOnInit(): void {
    this.Validation();
    this.CBoxAssured();
    this.DropDownType();
    console.log(this._types);
    this._clientForm.patchValue(this.data);
    this._arrayOfTypes = new Array<string>();
    this._arrayOfTypes.push('PJ', 'PF');
  }


}
