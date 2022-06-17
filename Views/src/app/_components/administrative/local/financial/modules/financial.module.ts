import { NgModule } from "@angular/core";


import { CommonModule } from "@angular/common"; import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { MainComponent } from '../components/main/main.component';
import { FinancialRoutingModule } from "./financial.routing.module";
import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { OutflowCrudService, OutTypePaymentCrudService } from "../components/daily/out/services/outflow-crud.service";

import { InflowCrudService } from "../components/daily/in/services/inflow-crud.service";

import { MonthlyOutFlowCreateComponent } from "../components/monthly/monthly-outflow-create/monthly-outflow-create.component";
import { DailyInflowCreateComponent } from "../components/daily/in/daily-inflow-create/daily-inflow-create.component";
import { DailyOutflowCreateComponent } from "../components/daily/out/daily-outflow-create/daily-outflow-create.component";
import { CardComponent } from "src/app/_components/administrative/local/financial/components/card/card.component";



//import { TypePaymentCrudService } from "../../providers/supplier/services/supplier-crud.service";
//import { ClientCrudService } from "../../../client/services/client-create-crud.service";
import { CheckingAccountService } from "../components/checking-account/services/checking-account.service";
import { CrudCardService } from "../components/card/services/crud-card.service";
import { TypePayCrudService } from "../components/type-payment/services/type-pay-crud.service";
import { CrudMonthlyOutflow } from "../components/monthly/monthly-outflow-create/services/crud-monthly-outflow";


// import { CrudChekingAccount } from "../components/cheking-account/services/crud-cheking-account";
// import { CrudCardService } from "../components/card/services/crud-card.service";



@NgModule({
  declarations: [
    MainComponent,
    DailyInflowCreateComponent,
    MonthlyOutFlowCreateComponent,
    DailyOutflowCreateComponent,
    CardComponent,

    NavFinancialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinancialRoutingModule,
    //My
    MaterialModule,
    SharedModule
  ],
  exports: [],
  providers: [
    InflowCrudService,
    TypePayCrudService,
    OutflowCrudService,
    OutTypePaymentCrudService,
    InflowCrudService,
    CrudCardService,
    //Inside InflowCrudService
   // ClientCrudService,
   CheckingAccountService,
    CrudMonthlyOutflow,
    CardComponent
  ]
})

export class FinancialModule {

}
