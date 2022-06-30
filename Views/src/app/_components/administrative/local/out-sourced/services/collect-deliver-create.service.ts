import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressValidatorsService } from "src/app/_shared/components/address/services/address-validators.service";
import { ValidatorsService } from "src/app/_shared/helpers/validators.service";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { PartnerDto } from "../dto/partner-dto";

@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto, number> {



  private _formMain: FormGroup;
  private _formDestiny: FormGroup;
  private _formSource: FormGroup;
  public cli: ClientDto[] = [];
  public par: PartnerDto[] = [];


  constructor(
    protected Http: HttpClient,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COLLECTDELIVER) }



  get formMain(): FormGroup {
    return this._formMain
  }

  set formSourceSet(field: string[]) {
    field.forEach((f: string) => {
      if (f != 'noRegisterName') {
        this._formSource.get(f).setValue(0);
      }
      if (f != 'noRegisterAddress') {
        this._formSource.get(f).setValue(0);
      }
      if (f === 'noRegisterName') {
        this._formSource.get(f).setValue("");
      }
      if (f === 'noRegisterAddress') {
        this._formSource.get(f).setValue("");
      }
    })

  }
  set formDestinySet(field: string[]) {
    field.forEach((f: string) => {
      if (f != 'noRegisterName') {
        this._formDestiny.get(f).setValue(0);
      }
      if (f != 'noRegisterAddress') {
        this._formDestiny.get(f).setValue(0);
      }
      if (f === 'noRegisterName') {
        this._formDestiny.get(f).setValue("");
      }
      if (f === 'noRegisterAddress') {
        this._formDestiny.get(f).setValue("");
      }
    })
  }

  get formSource(): FormGroup {
    return this._formSource
  }
  get formDestiny(): FormGroup {
    return this._formDestiny
  }



  formLoadMain() {
    return this._formMain = this._Fb.group({
      transporterId: ['', []],
      sourceAddress: this.formLoadSource(),
      destinyAddress: this.formLoadDestiny(),
      transporterNoregisterd: ['', []],
      noregisterd: ['', []],
      start: [new Date(), []],
      price: ['', []],
      items: ['', []],
      comments: ['', []],
    })
  }
  formLoadSource(): FormGroup {
    return this._formSource = this._Fb.group({
      sourceClientId: [0, []],
      sourcePartnerId: [0, []],

      noRegisterName: [null, []],
      noRegisterAddress: [null, []],
    })
  }
  formLoadDestiny(): FormGroup {
    return this._formDestiny = this._Fb.group({
      destinyClientId: [0, []],
      destinyPartnerId: [0, []],

      noRegisterName: [null, []],
      noRegisterAddress: [null, []],
    })
  }



  save() {
    let cdDto: CollectDeliverDto = { ...this.formMain.value }

    console.log(cdDto)
    this.add$<CollectDeliverDto>(cdDto).subscribe({
      next: (result: CollectDeliverDto) => {
        console.log(result)
        this._SnackBar.msgCenterTop(`Parceiro ${result.start} ${result.price}`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], this.formMain);
        this._Route.navigate(['partners']);
      }
    })

  }
}
