import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";
import { PhysicallyMovingCostsDto } from "../../dtos/physically-moving-costs";

@Injectable({ providedIn: 'root' })
export class PhysicallyMovingCostsService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
     override _breakpointObserver: BreakpointObserver,
    ) {
    super(_breakpointObserver)
  }


  subFormLoad(entity?:PhysicallyMovingCostsDto): FormGroup {
  return  this.subForm = this._fb.group({
      id: [entity?.id || 0, [Validators.required]],
      fuel: [entity?.fuel || 0, []],
      apps: [entity?.apps || 0, []],
      publicTransport: [entity?.publicTransport || 0, []],
      motoBoy: [entity?.motoBoy || 0, []],
    })
  }


}
