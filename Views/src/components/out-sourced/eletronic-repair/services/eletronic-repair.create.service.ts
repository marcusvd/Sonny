import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ElectronicRepairDto } from "../dto/electronic-repair-dto";

@Injectable()

export class EletronicRepairCreateService extends BackEndService<ElectronicRepairDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,

    // private _Route: Router,
    // private _PartnerListService: PartnerListService,
  ) { super(_http, environment.backEndDoor) }

  electronicRepairPartners: PartnerDto[] = [];

  loadPartners() {
    this.loadById$<PartnerDto[]>('partners/GetAllEletronicRepairAsync',localStorage.getItem("companyId")).subscribe({
      next: (parteners:PartnerDto[]) => {
        this.electronicRepairPartners = parteners
      },
      error:(errors)=>{
      }
    })
  }

  save(form: FormGroup) {
    let toSave: ElectronicRepairDto = { ...form.value }

    // const partnerId: number = parseInt(form.get('partnerId').value);
    // let authorized = (form.get('authorized').value);
    // let finished = (form.get('finished').value);

    // if (!authorized) {
    //   toSave.authorized = false;

    // }
    // if (!partnerId) {
    //   toSave.partnerId = 0;
    // }
    // if (!toSave.finished) {
    //   toSave.finished = false;
    // }

    this.add$<ElectronicRepairDto>(toSave, 'eletronicsrepairs/addeletronicrepair').subscribe({
      next: () => {
        // this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        // this._route.navigateByUrl('/clientlist').then((item) => {
        //   if (!item) {
        //     this._route.navigateByUrl('create');
        //   }
        // });
        // this._Route.navigate(['/clientmain/clientlist']);
      },
      error: (errors) => {
        // this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }
}



