import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


import { BillingFromDto } from "../dto/billing-from-dto";
import { CollectDeliverDto } from "../dto/collect-deliver-dto";
import { DestinyDto } from "../dto/destiny-dto";
import { AtLeastOneBillingFromSelectedValidator } from '../validators/at-least-one-billing-from-selected.validator';
import { AtLeastOneCollectDeliverOtherValidator } from '../validators/at-least-one-collect-deliver-other.validator';
import { AtLeastOneDestinySelectedValidator } from '../validators/at-least-one-destiny-selected.validator';
import { BaseForm } from "src/shared/components/inheritance/forms/base-form";


@Injectable()

export class FormCollectDeliverService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
  ) { super() }



  destinyFormLoad(entity?: DestinyDto) {
    return this._fb.group({
      companyId: this._fb.control<number>(entity?.companyId ?? this.companyId, [Validators.required]),

      customerId: this._fb.control<number | null>(entity?.customerId ?? null, []),
      partnerId: this._fb.control<number | null>(entity?.partnerId ?? null, []),

      noRegisterName: this._fb.control<string | null>(entity?.noRegisterName ?? null, []),
      noRegisterAddress: this._fb.control<string | null>(entity?.noRegisterAddress ?? null, [])
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

  formLoad(edit: boolean, entity?: CollectDeliverDto): FormGroup {
    return this._fb.group({
      id: [entity?.id ?? 0, []],
      companyId: [entity?.companyId ?? this.companyId, [Validators.required]],
      userId: [entity?.userId ?? this.userId, [Validators.required]],
      transporterId: [entity?.transporterId as number, [Validators.required]],
      start: [entity?.start, [Validators.required]],
      contactName: [entity?.contactName ?? '', [Validators.required, Validators.maxLength(50)]],
      price: [entity?.price ?? 0, [Validators.required]],

      collect: edit ? [new Date(entity?.collect as string).getFullYear() != this.minValue.getFullYear() ? true : false, []] : [entity?.collect ?? false, []],
      deliver: edit ? [new Date(entity?.deliver as string).getFullYear() != this.minValue.getFullYear() ? true : false, []] : [entity?.deliver ?? false, []],
      other: edit ? [new Date(entity?.other as string).getFullYear() != this.minValue.getFullYear() ? true : false, []] : [entity?.other ?? false, []],

      kindTransport: [entity?.kindTransport, [Validators.required]],
      taskOverView: [entity?.taskOverView ?? '', [Validators.required, Validators.maxLength(1000)]],
      billingFrom: this.billingFromFormLoad(entity?.billingFrom),
      destiny: this.destinyFormLoad(entity?.destiny),
    }, { validators: AtLeastOneCollectDeliverOtherValidator() })
  }



}
