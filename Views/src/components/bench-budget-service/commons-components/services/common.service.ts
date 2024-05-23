import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { PhysicallyMovingCostsDto } from 'src/components/main/inheritances/dtos/physically-moving-costs';
import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService extends BackEndService<PhysicallyMovingCostsDto> {

  constructor(override _http: HttpClient) {
    super(_http, environment.backEndDoor)
  }

  private _priceShow: number;

  get getPriceShow() {
    return this._priceShow;
  }

  physicallyMovingCostsDto: PhysicallyMovingCostsDto = new PhysicallyMovingCostsDto();
  urlCustomerWithTransporterCosts: string = 'customers/GetByIdIncludedPhysicallyMovingCosts';


  getCustomer(id: string) {

    this.loadById$<CustomerDto>(this.urlCustomerWithTransporterCosts, id)
      .subscribe((x: CustomerDto) => {
        this.physicallyMovingCostsDto = x.physicallyMovingCosts
      })

  }

  switchPhysicallyMovingCosts(selected: number, subForm: FormGroup) {

    switch (selected) {

      case 0:
        if (!this.physicallyMovingCostsDto.fuel)
          subForm.get('price').setValue(0);
        else {
          subForm.get('price').setValue(this.physicallyMovingCostsDto.fuel);
          this._priceShow = this.physicallyMovingCostsDto.fuel;
        }
        break;

      case 1:
        if (!this.physicallyMovingCostsDto.apps)
          subForm.get('price').setValue(0);
        else {
          subForm.get('price').setValue(this.physicallyMovingCostsDto.apps);
          this._priceShow = this.physicallyMovingCostsDto.apps;
        }
        break;

      case 2:
        if (!this.physicallyMovingCostsDto.publicTransport)
          subForm.get('price').setValue(0);
        else {
          subForm.get('price').setValue(this.physicallyMovingCostsDto.publicTransport);
          this._priceShow = this.physicallyMovingCostsDto.publicTransport;
        }
        break;

      case 3:
        if (!this.physicallyMovingCostsDto.motoBoy)
          subForm.get('price').setValue(0);
        else {
          subForm.get('price').setValue(this.physicallyMovingCostsDto.motoBoy);
          this._priceShow = this.physicallyMovingCostsDto.motoBoy;
        }
        break;

      case 4:
        subForm.get('price').setValue(0);


        return true;
        break;

      case 5:
        subForm.get('price').setValue(0);
        break;

    }

    return false;
  }





}
