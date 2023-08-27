import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BaseForm } from "src/shared/helpers/forms/base-form";

@Injectable({ providedIn: 'root' })
export class PhysicallyMovingCostsService extends BaseForm {

  constructor(
    private _fb: FormBuilder,
     override _breakpointObserver: BreakpointObserver,
    ) {
    super(_breakpointObserver)
  }


  subFormLoad(): FormGroup {
  return  this.subForm = this._fb.group({
      fixedCostAssured: [0, []],
      fuel: [0, []],
      apps: [0, []],
      publicTransport: [0, []],
      motoBoy: [0, []],
    })
  }


}
