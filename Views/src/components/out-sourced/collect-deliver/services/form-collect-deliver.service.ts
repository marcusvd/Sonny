import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { BackEndService } from "../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../shared/services/messages/snack-bar.service";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { CollectDeliverUpdateDto } from "../dto/collect-deliver-update-dto";
import { AtLeastOneCollectDeliverOtherValidator } from '../validators/at-least-one-collect-deliver-other.validator';
import { AtLeastOneDestinySelectedValidator } from '../validators/at-least-one-destiny-selected.validator';
import { AtLeastOneBillingFromSelectedValidator } from '../validators/at-least-one-billing-from-selected.validator';
import { DestinyDto } from "../dto/destiny-dto";
import { BillingFromDto } from "../dto/billing-from-dto";


@Injectable()

export class CollectDeliverEditService  {

  constructor(
    private _fb: FormBuilder,
  ) { }



   destinyFormLoad(entity?: DestinyDto) {
    return  this._fb.group({
      companyId: this._fb.control<number>(entity?.companyId ?? this.companyId, [Validators.required]),
      
      customerId: this._fb.control<number | null>(entity?.customerId ?? null, []),
      partnerId: this._fb.control<number | null>(entity?.partnerId ?? null, []),

      noRegisterName: this._fb.control<string  | null>(entity?.noRegisterName ?? null, []),
      noRegisterAddress: this._fb.control<string  | null>(entity?.noRegisterAddress ?? null, [])
    }, { validators: AtLeastOneDestinySelectedValidator() })
  }

  billingFromFormLoad(entity?: BillingFromDto) {
    return this._fb.group({
      companyId: this._fb.control<number>(entity?.companyId ?? this.companyId, [Validators.required]),

      customerId: this._fb.control<number | null>(entity?.customerId ?? null, [Validators.required]),
      partnerId: this._fb.control<number | null>(entity?.partnerId ?? null, [Validators.required]),
      base: this._fb.control<boolean>(entity?.base ?? false, [Validators.required]),
      
    }, { validators: AtLeastOneBillingFromSelectedValidator() })
  }

  formLoad(entity?: CollectDeliverDto) {
    return this._fb.group({
      id: [entity?.id ?? 0, []],
      companyId: [entity?.companyId ?? this.companyId, [Validators.required]],
      userId: [entity?.userId ?? this.userId, [Validators.required]],
      transporterId: [entity?.transporterId ?? '', [Validators.required]],
      start: [entity?.start ?? '', [Validators.required]],
      contactName: [entity?.contactName ?? '', [Validators.required, Validators.maxLength(50)]],
      price: [entity?.price ?? 0, [Validators.required]],
      collect: [entity?.collect ?? false, []],
      deliver: [entity?.deliver ?? false, []],
      other: [entity?.other ?? false, []],
      kindTransport: ['', [Validators.required]],
      taskOverView: [entity?.taskOverView ?? '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.billingFromFormLoad(entity?.billingFrom),
      destiny: this.destinyFormLoad(entity?.destiny),
    }, { validators: AtLeastOneCollectDeliverOtherValidator() })
  }



}
