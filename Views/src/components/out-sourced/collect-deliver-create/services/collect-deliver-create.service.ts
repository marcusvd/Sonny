import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AddressService } from "src/shared/components/address/services/address.service";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CollectDeliverDto } from "../../collect-deliver-list-table-all/dto/collect-deliver-dto";

import { PartnerDto } from "../../../partner/dto/partner-dto";
import { CustomerDto } from "src/components/customer/dto/customer-dto";

@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto, number> {

  //private _formMain: FormGroup;
  public cli: CustomerDto[] = [];
  public par: PartnerDto[] = [];
  public com: CompanyDto[] = [];

  constructor(
    protected _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _Route: Router,


  ) { super(_http, environment._COLLECTDELIVER) }


  // get formMain(): FormGroup {
  //   return this._formMain
  // }

  // set setFormSource(field: string) {
  //   switch (field) {
  //     case 'client':
  //       const fieldsClient: string[] = ['sourcePartnerId', 'sourceCompanyId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
  //       fieldsClient.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'partner':
  //       const fieldsPartner: string[] = ['sourceClientId', 'sourceCompanyId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
  //       fieldsPartner.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'base':
  //       const fieldsBase: string[] = ['sourcePartnerId', 'sourceClientId', 'sourceNoRegisterName', 'sourceNoRegisterAddress'];
  //       fieldsBase.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'other':
  //       const fieldsOther: string[] = ['sourcePartnerId', 'sourceClientId', 'sourceCompanyId'];
  //       fieldsOther.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //   }
  // }

  // set setFormDestiny(field: string) {
  //   switch (field) {
  //     case 'client':
  //       const fieldsClient: string[] = ['destinyPartnerId', 'destinyCompanyId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
  //       fieldsClient.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'partner':
  //       const fieldsPartner: string[] = ['destinyClientId', 'destinyCompanyId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
  //       fieldsPartner.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'base':
  //       const fieldsBase: string[] = ['destinyClientId', 'destinyPartnerId', 'destinyNoRegisterName', 'destinyNoRegisterAddress'];
  //       fieldsBase.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //     case 'other':
  //       const fieldsOther: string[] = ['destinyPartnerId', 'destinyClientId', 'destinyCompanyId'];
  //       fieldsOther.map(x => this.formMain?.get(x).setValue(null));
  //       break;
  //   }

  // }

  checkSourceDestiny(form: FormGroup) {
    if (form.get('sourceCustomerId').value && form.get('destinyCustomerId').value) {

      if (form.get('sourceCustomerId').value === form.get('destinyCustomerId').value) {
        alert('Origem e destino não podem ser o mesmo, corrija o formulário e continue, por favor.')
        return false;
      }
      return true;
    }

    else if (form.get('sourcePartnerId').value && form.get('destinyPartnerId').value) {

      if (form.get('sourcePartnerId').value === form.get('destinyPartnerId').value) {
        alert('Origem e destino não podem ser o mesmo, corrija o formulário e continue, por favor.')
        return false;
      }
      return true;
    }

    else if (form.get('sourceCompanyId').value && form.get('destinyCompanyId').value) {

      if (form.get('sourceCompanyId').value === form.get('destinyCompanyId').value) {
        alert('Origem e destino não podem ser o mesmo, corrija o formulário e continue, por favor.')
        return false;
      }
      return true;
    }
    else {
      return true;
    }
  }



  save(form: FormGroup) {
    // form.value.start = new Date(form.value.start);

    const toSave: CollectDeliverDto = { ...form.value }
    this.add$<CollectDeliverDto>(toSave).subscribe({
      next: () => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })

  }

}
