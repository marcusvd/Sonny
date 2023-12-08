import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialRoutingModule } from "./financial.routing.module";
import { CheckingAccountService } from "../services/checking-account.service";
import { CheckingAccountComponent } from "../components/checking-account/component/cheking-account.component"
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { FinancialExpensesComponent } from "../components/financial-expenses/components/add/financial-expenses.component";
import { FinancialExpensesService } from "../components/financial-expenses/services/financial-expenses.service";
import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { FinancialExpensesNotPredictableService } from "../components/financial-expenses-not-predictable/services/financial-expenses-not-predictable.service";
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";


@NgModule({
  declarations: [
    FinancialExpensesComponent,
    FinancialExpensesNotPredictableCreateComponent,
    EssentialExpensesCreateComponent,
    CheckingAccountComponent,
    NavFinancialComponent,
    FinancialDashComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinancialRoutingModule,
    //My
    SharedModule
  ],
  exports: [

  ],
  providers: [
    FinancialExpensesNotPredictableService,
    CheckingAccountService,
    FinancialExpensesService,
    CustomersLengthResolver

  ]
})

export class FinancialModule {

}
