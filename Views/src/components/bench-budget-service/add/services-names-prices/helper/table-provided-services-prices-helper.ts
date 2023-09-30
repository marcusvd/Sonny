import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class TableProvidedServicesPricesHelper {

  constructor(private _fb: FormBuilder) { }



  formTableProvidedServicesPrices: FormGroup;
  formLoadTableProvidedServicesPrices() {
    this.formTableProvidedServicesPrices = this._fb.group({
      TableProvidedServicesPrices: this._fb.array([])
    })
  }

  subFormGroupTableProvidedServicesPrices: FormGroup;
  subFormMakerTableProvidedServicesPrices() {
    return this.subFormGroupTableProvidedServicesPrices = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
      serviceName:['', [Validators.required]],
      priceService:['', [Validators.required]],
    })
  }

  addTableProvidedServicesPrices() {
    this.TableProvidedServicesPrices.push(this.subFormMakerTableProvidedServicesPrices())
  }

  removeTableProvidedServicesPrices(index: number) {
    this.TableProvidedServicesPrices.removeAt(index);
  }

  get TableProvidedServicesPrices(): FormArray {
    return <FormArray>this.formTableProvidedServicesPrices.get('TableProvidedServicesPrices');
  }


}
