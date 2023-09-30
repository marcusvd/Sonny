import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class OpenBudgetHelper {

  constructor(private _fb: FormBuilder) { }






  // subFormGroupTableProvidedServicesPrices: FormGroup;
  // subFormMakerTableProvidedServicesPrices() {
  //   return this.subFormGroupTableProvidedServicesPrices = this._fb.group({
  //     companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
  //     serviceName:['', [Validators.required]],
  //     priceService:['', [Validators.required]],
  //   })
  // }

  // addTableProvidedServicesPrices() {
  //   this.TableProvidedServicesPrices.push(this.subFormMakerTableProvidedServicesPrices())
  // }

  // removeTableProvidedServicesPrices(index: number) {
  //   this.TableProvidedServicesPrices.removeAt(index);
  // }

  // get TableProvidedServicesPrices(): FormArray {
  //   return <FormArray>this.formTableProvidedServicesPrices.get('TableProvidedServicesPrices');
  // }


}
