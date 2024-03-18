import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

//Components
import { SharedModule } from "src/shared/modules/shared.module";
import { CustomerRoutingModule } from "./customer.routing.module";

import { PhysicallyMovingCostsComponent } from "../../inheritances/physically-moving-costs/physically-moving-costs.component";
import { CustomerCreateComponent } from "../components/add/customer-create.component";
import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
import { CustomersListComponent } from "../components/customers-list/customers-list.component";
import { FinancialInfoTypeComponent } from "../components/commons-components/financial-info-type/financial-info-type.component";
import { NameCpfCnpjComponent } from "src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component";
import { GridListModule } from "src/shared/components/grid-list-opts/modules/grid-list.module.module";


@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerDashComponent,
    FinancialInfoTypeComponent,
    // TestComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //MY IMPORTS
    SharedModule,
    CustomerRoutingModule,

    //StandAlone
    NameCpfCnpjComponent,
    CustomersListComponent,


  ],
  exports: [
    // CustomerCreateComponent,
    CustomerDashComponent,
    CustomersListComponent,
  ],
  providers: [
    PhysicallyMovingCostsComponent
    // CustomerCreateService,
    // ContactService,
    // AddressService,
    // AddressComponent

  ],
})

export class CustomerModule {

}
