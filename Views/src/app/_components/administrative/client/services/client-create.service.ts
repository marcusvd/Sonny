import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { ContactValidatorsService } from "src/app/_shared/components/contact/services/contact-validators.service";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { NavBackService } from "src/app/_shared/services/navigation/nav-back.service";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientCreateService extends BackEndService<ClientDto, number> {
  constructor(
    protected _Http: HttpClient,
    public _Addr: AddressValidatorsService,
    private _CntValService: ContactValidatorsService,
    private _Route: Router,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
    public _ButtonBack: NavBackService,
    private _Fb: FormBuilder,

  ) {
    super(_Http, environment._CLIENTS);
  }

  //#region
  public form: FormGroup;

  formClient(): FormGroup {
    return this.form = this._Fb.group({
      name: ['', []],
      cnpj: ['', []],
      responsible: ['', []],
      comments: ['', []],
      assured: ['', []],
      clienttype: ['', []],
      payment: ['', []],
      expiration: ['', []],
      discount: ['', []],
      address: this._Addr.AddressForm(),
      contact: this._CntValService.ContactForm()
    })
  }

  save() {
    if (!this.form.value.discount) {
      this.form.value.discount = 0;
    }
    const toSave: ClientDto = { ...this.form.value }

    this.add$<ClientDto>(toSave).subscribe({
      next: (_cli: ClientDto) => {
        this._SnackBar.msgCenterTop(`Parceiro ${_cli.name} ${_cli.assured}`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this.form);
        this._Route.navigateByUrl('clientmain/clientlist').then((item) => {
          if (!item) {
            this._Route.navigateByUrl('clientmain/create');
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
