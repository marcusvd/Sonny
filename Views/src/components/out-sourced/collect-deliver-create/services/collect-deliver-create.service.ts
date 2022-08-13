import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressService } from "src/shared/components/address/services/address.service";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "../../../client/dto/client-dto";
import { CollectDeliverDto } from "../../collect-deliver-list-table-all/dto/collect-deliver-dto";

import { PartnerDto } from "../../../partner/dto/partner-dto";

@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto, number> {



  private _formMain: FormGroup;
  public cli: ClientDto[] = [];
  public par: PartnerDto[] = [];
  public com: CompanyDto[] = [];


  constructor(
    protected Http: HttpClient,
    private _SnackBar: MsgOperation,
    private _Route: Router,
    public _ValidationMsg: ValidatorsService,

  ) { super(Http, environment._COLLECTDELIVER) }



  get formMain(): FormGroup {
    return this._formMain
  }

  set setFormSource(field: string) {
    switch (field) {
      case 'client':
        const fClient: string[] = ['sourcePartnerId','sourceCompanyId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
        fClient?.forEach((fc: string) => {
          this.formMain?.get(fc).setValue(null);
        })
        break;
      case 'partner':
        const fPartner: string[] = ['sourceClientId','sourceCompanyId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
        fPartner?.forEach((fp: string) => {
          this.formMain?.get(fp).setValue(null);
        })
        break;
      case 'other':
        const fOther: string[] = ['sourcePartnerId', 'sourceClientId', 'sourceCompanyId'];
        fOther?.forEach((fo: string) => {
          if (this.formMain?.get(fo).value != null || undefined || NaN) {
            this.formMain?.get(fo).setValue(null);
          }
        })
        break;
      case 'base':
        const fBase: string[] = ['sourcePartnerId','sourceClientId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
        fBase?.forEach((fo: string) => {
          if (this.formMain?.get(fo).value != null || undefined || NaN) {
            this.formMain?.get(fo).setValue(null);
          }
        })
        break;
    }
  }
  set setFormDestiny(field: string) {
    // switch (field) {
    //   case 'client':

    //     const fClient: string[] = ['destinyPartnerId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
    //     fClient.forEach((fc: string) => {
    //       this.formMain.get(fc).setValue(null);
    //     })
    //     break;
    //   case 'partner':
    //     const fPartner: string[] = ['destinyClientId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
    //     fPartner.forEach((fp: string) => {
    //       this.formMain.get(fp).setValue(null);
    //     })
    //     break;
    //   case 'other':
    //     const fOther: string[] = ['destinyPartnerId', 'destinyClientId'];
    //     fOther.forEach((fo: string) => {
    //       this.formMain.get(fo).setValue(null);
    //     })
    //     break;
    // }

    switch (field) {
      case 'client':
        const fClient: string[] = ['destinyPartnerId','destinyCompanyId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
        fClient?.forEach((fc: string) => {
          this.formMain?.get(fc).setValue(null);
        })
        break;
      case 'partner':
        const fPartner: string[] = ['destinyClientId','destinyCompanyId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
        fPartner.forEach((fp: string) => {
          this.formMain?.get(fp).setValue(null);
        })
        break;
      case 'other':
        const fOther: string[] = ['destinyPartnerId', 'destinyClientId', 'destinyCompanyId'];
        fOther?.forEach((fo: string) => {
          if (this.formMain?.get(fo).value != null || undefined || NaN) {
            this.formMain?.get(fo).setValue(null);
          }
        })
        break;
      case 'base':
        const fBase: string[] = ['destinyClientId','destinyPartnerId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
        fBase?.forEach((fo: string) => {
          if (this.formMain?.get(fo).value != null || undefined || NaN) {
            this.formMain?.get(fo).setValue(null);
          }
        })
        break;
    }

  }


  save(form: FormGroup) {
    let cdDto: CollectDeliverDto = { ...form.value }
    form.value.start = new Date(form.value.start);
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
