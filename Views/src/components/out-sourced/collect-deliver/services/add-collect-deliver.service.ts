import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";


import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { BackEndService } from "../../../../shared/services/back-end/backend.service";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";



@Injectable()

export class AddCollectDeliverService extends BackEndService<CollectDeliverDto> {

  constructor(
    override _http: HttpClient,
    private _router: Router,
  ) { super(_http, environment._COLLECT_DELIVER) }


  handleBeforeSave(entity: CollectDeliverDto) {
    const handled = entity;

    if (handled.collect)
      handled.collect = new Date();
    else
      handled.collect = this.minValue;
    if (handled.deliver)
      handled.deliver = new Date();
    else
      handled.deliver = this.minValue;
    if (handled.other)
      handled.other = new Date();
    else
      handled.other = this.minValue;

    if (handled.destiny.customerId || handled.destiny.partnerId) {
      handled.destiny.noRegisterAddress = null;
      handled.destiny.noRegisterName = null;
    }


    return handled;
  }


  save(form: FormGroup) {

    const toSave: CollectDeliverDto = this.handleBeforeSave({ ...form.value })

    console.log(toSave)



    this.add$<CollectDeliverDto>(toSave, 'addcollectdeliver').subscribe({
      next: () => {
        this.openSnackBar(this.defaultMessages.added, 'success')
        this._router.navigateByUrl(`/partner-dash/list-collect-deliver/${this.companyId}`)
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this.openSnackBar(this.defaultMessages.error, 'error')
      }
    })

  }

}
