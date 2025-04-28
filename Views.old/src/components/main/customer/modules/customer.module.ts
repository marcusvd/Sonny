import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { CustomerRoutingModule } from "./customer.routing.module";

import { PhysicallyMovingCostsComponent } from "../../inheritances/physically-moving-costs/physically-moving-costs.component";
import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
// import { FinancialInfoTypeComponent } from "../components/commons-components/financial-info-type/financial-info-type.component";
import { NameCpfCnpjComponent } from "src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component";


@NgModule({
  declarations: [
    CustomerDashComponent,
    // FinancialInfoTypeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CustomerRoutingModule,

  ],
  exports: [
    CustomerDashComponent,
  ],
  providers: [
    PhysicallyMovingCostsComponent
  ],
})

export class CustomerModule {

}
