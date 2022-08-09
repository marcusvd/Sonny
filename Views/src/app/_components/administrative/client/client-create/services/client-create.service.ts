import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { AddressService } from "src/app/_shared/components/address/services/address.service";
import { ContactService } from "src/app/_shared/components/contact/services/contact.service";
import { ValidatorsService } from "src/app/_shared/helpers/form-validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from 'src/environments/environment';

@Injectable({providedIn:'root'})
export class ClientCreateService extends BackEndService<ClientDto, number> {


  private _formMain: FormGroup;


  constructor(
    protected _Http: HttpClient,
    public _Addr: AddressService,
    private _CntValService: ContactService,
    private _Route: Router,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
     private _Fb: FormBuilder,

  ) {
    super(_Http, environment._CLIENTS);
  }

  //#region

 get formMainGet(){
    return this._formMain
  }

  formMain(): FormGroup {
    return this._formMain = this._Fb.group({
      name: ['', []],
      cnpj: ['', []],
      responsible: ['', []],
      comments: ['', []],
      assured: ['', []],
      clienttype: ['', []],
      payment: ['', []],
      expiration: ['', []],
      discount: [0, []],
      address: this._Addr.AddressForm(),
      contact: this._CntValService.ContactForm()
    })
  }

  save() {


    const toSave: ClientDto = { ...this._formMain.value }

    this.add$<ClientDto>(toSave).subscribe({
      next: (_cli: ClientDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${_cli.name} ${_cli.assured}`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formMain);
        this._Route.navigateByUrl('/clientlist').then((item) => {
          if (!item) {
            this._Route.navigateByUrl('create');
          }
        });
        // this._Route.navigate(['/clientmain/clientlist']);
      },
      error: (err) => {
        console.log(err)
      }
    })



  }

  //#endregion










}
