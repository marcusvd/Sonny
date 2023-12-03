import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialRoutingModule } from "./financial.routing.module";
import { CheckingAccountService } from "../services/checking-account.service";
import { TypePayCrudService } from "../services/type-pay-crud.service";
import { CheckingAccountComponent } from "../components/checking-account/component/cheking-account.component"
import { TypePaymentCreateComponent } from "../components/type-payment/type-payment-create/type-payment-create.component";
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
import { FinancialExpensesComponent } from "../components/financial-expenses/components/add/financial-expenses.component";
import { FinancialExpensesService } from "../components/financial-expenses/services/financial-expenses.service";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";


@NgModule({
  declarations: [
    FinancialExpensesComponent,
    TypePaymentCreateComponent,
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
    TypePayCrudService,
    CheckingAccountService,
    FinancialExpensesService,

  ]
})

export class FinancialModule {

}
