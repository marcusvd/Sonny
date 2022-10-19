import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"; import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";

import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialRoutingModule } from "./financial.routing.module";
import { OutflowCrudService, OutTypePaymentCrudService } from "../components/daily/out/services/outflow-crud.service";
import { InflowCrudService } from "../components/daily/in/services/inflow-crud.service";
import { MonthlyOutFlowCreateComponent } from "../components/monthly/monthly-outflow-create/monthly-outflow-create.component";
import { DailyInflowCreateComponent } from "../components/daily/in/daily-inflow-create/daily-inflow-create.component";
import { DailyOutflowCreateComponent } from "../components/daily/out/daily-outflow-create/daily-outflow-create.component";
import { CardComponent } from "src/components/financial/components/card/card.component";
import { CheckingAccountService } from "../services/checking-account.service";
import { CrudCardService } from "../components/card/services/crud-card.service";
import { TypePayCrudService } from "../services/type-pay-crud.service";
import { MonthlyOutflowService } from "../components/monthly/monthly-outflow-create/services/monthly-outflow.service";
import { CheckingAccountComponent } from  "../components/checking-account/component/cheking-account.component"
import { TypePaymentCreateComponent } from "../components/type-payment/type-payment-create/type-payment-create.component";




@NgModule({
  declarations: [
    DailyInflowCreateComponent,
    MonthlyOutFlowCreateComponent,
    DailyOutflowCreateComponent,
    CardComponent,
    TypePaymentCreateComponent,
    CheckingAccountComponent,
    NavFinancialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinancialRoutingModule,
    //My
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
   CheckingAccountService,
    MonthlyOutflowService,
    CardComponent
  ]
})

export class FinancialModule {

}
