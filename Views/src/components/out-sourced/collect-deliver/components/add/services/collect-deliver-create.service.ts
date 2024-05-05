import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { CollectDeliverDto } from "../../../dto/collect-deliver-dto";


import { PartnerDto } from "src/shared/entities-dtos/main/partner/partner-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomerDto } from "src/shared/entities-dtos/main/customer/customer-dto";


@Injectable()

export class CollectDeliverCreateService extends BackEndService<CollectDeliverDto> {

  //private _formMain: FormGroup;
  public cli: CustomerDto[] = [];
  public transporters: PartnerDto[] = [];
  public com: CompanyDto[] = [];

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _router: Router,
  ) { super(_http, environment._COLLECTDELIVER) }

  // paramsTo(pageIndex: number = 1, pageSize: number = 10) {
  //   let params = new HttpParams();
  //   params = params.append('pgnumber', pageIndex);
  //   params = params.append('pgsize', pageSize);
  //   params = params.append('predicate', JSON.parse(localStorage.getItem('companyId')));

  //   return params;
  // }

  // GetAllCustomersPaginated(pgNumber: number, pgSize: number) {
  //   return this.loadAllPaged$<CustomerDto[]>('customers/GetAllCustomersPagedAsync', this.paramsTo());
  // }

  companyId: number = JSON.parse(localStorage.getItem('companyId'));
  save(form: FormGroup) {

    console.log(form.value);

    const toSave: CollectDeliverDto = { ...form.value }
    console.log(toSave);

    this.add$<CollectDeliverDto>(toSave, 'addcollectdeliver').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0);
        this._router.navigateByUrl(`/side-nav/partner-dash/list-collect-deliver/${this.companyId}`)
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.defaultSnackMsg('4',1);
      }
    })

  }

}
