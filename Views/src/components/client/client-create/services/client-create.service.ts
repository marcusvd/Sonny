import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientDto } from "src/components/client/dto/client-dto";
import { AddressService } from "src/shared/components/address/services/address.service";
import { ContactService } from "src/shared/components/contact/services/contact.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { NavBackService } from "src/shared/services/navigation/nav-back.service";
import { environment } from 'src/environments/environment';
import { ValidatorsService } from "src/shared/helpers/form-validators.service";

@Injectable({ providedIn: 'root' })
export class ClientCreateService extends BackEndService<ClientDto, number> {


  private _formMain: FormGroup;
  private _valueDate: boolean;


  constructor(
    protected _Http: HttpClient,
    private _Addr: AddressService,
    private _CntValService: ContactService,
    private _Route: Router,
    private _SnackBar: MsgOperation,
    private _ValidationMsg: ValidatorsService,
    private _Fb: FormBuilder,

  ) {
    super(_Http, environment._CLIENTS);
  }

  //#region

  get formMainGet() {
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

  valueDate() {
   this._valueDate = !this._valueDate
  }
  get valueDateGet() {
    return this._valueDate
  }



  //#endregion










}
