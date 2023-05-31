import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";



import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CustomerDto } from "src/components/customer/dto/customer-dto";


@Injectable({ providedIn: 'root' })

export class TableFullGService extends BackEndService<CustomerDto, number>{

  constructor(
    override _http: HttpClient,
   ) { super(_http, environment.backEndDoor) }



  //  radioChose($event: string) {

  //   switch ($event) {

  //     case 'customer':
  //       this.typeEntitySelected = 'customer';
  //       this.urlToChange = 'customers/GetAllPagedCustomersAsync';
  //       this.dataSource.loadEntities('customers/GetAllPagedCustomersAsync', this.paramsTo());
  //       this.length = this.lengthCustomer;
  //       // this.radioChoseOutput.emit($event);
  //       break;
  //     case 'partner':
  //       this.typeEntitySelected = 'partner';
  //       this.urlToChange = 'partners/GetAllPagedPartnersAsync';
  //       this.dataSource.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
  //       this.length = this.lengthPartner;
  //       // this.radioChoseOutput.emit($event);
  //       break;
  //     case 'others':
  //       this.typeEntitySelected = 'partner';
  //       this.urlToChange = 'partners/GetAllPagedPartnersAsync';
  //       this.dataSource.loadEntities('partners/GetAllPagedPartnersAsync', this.paramsTo());
  //       this.length = this.lengthPartner;
  //       // this.radioChoseOutput.emit($event);
  //       break;
  //   }
  // }




  }









