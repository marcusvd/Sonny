import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/shared/modules/shared.module";
import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialRoutingModule } from "./financial.routing.module";
import { OutflowCrudService, OutTypePaymentCrudService } from "../components/daily/out/services/outflow-crud.service";
import { InflowCrudService } from "../components/daily/in/services/inflow-crud.service";
import { DailyInflowCreateComponent } from "../components/daily/in/daily-inflow-create/daily-inflow-create.component";
import { DailyOutflowCreateComponent } from "../components/daily/out/daily-outflow-create/daily-outflow-create.component";
import { CheckingAccountService } from "../services/checking-account.service";
import { TypePayCrudService } from "../services/type-pay-crud.service";
import { CheckingAccountComponent } from "../components/checking-account/component/cheking-account.component"
import { TypePaymentCreateComponent } from "../components/type-payment/type-payment-create/type-payment-create.component";
import { FinancingLoansComponent } from "../components/financing-loans/components/create/financing-loans.component";
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancingLoansService } from "../components/financing-loans/services/financing-loans.service";


@NgModule({
  declarations: [
    DailyInflowCreateComponent,
    FinancingLoansComponent,
    DailyOutflowCreateComponent,
    TypePaymentCreateComponent,
    EssentialExpensesCreateComponent,
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
    CheckingAccountService,
    FinancingLoansService,
  ]
})

export class FinancialModule {

}
