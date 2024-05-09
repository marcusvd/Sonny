import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
// import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialRoutingModule } from "./financial.routing.module";
import { BankAccountService } from "../services/bank-account.service";

// import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
// import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";
// import { FinancialExpensesComponent } from "../components/financial-expenses/components/add/financial-expenses.component";
import { FinancialExpensesService } from "../components/financial-expenses/services/financial-expenses.service";
// import { FinancialExpensesNotPredictableCreateComponent } from "../components/financial-expenses-not-predictable/components/create/financial-expenses-not-predictable.component";
import { FinancialExpensesNotPredictableService } from "../components/financial-expenses-not-predictable/services/financial-expenses-not-predictable.service";
// import { BankAccountCardsComponent } from "../components/bank-account-cards/add/bank-account-cards.component";
// import { BankAccountComponent } from "../components/common-components/bank-account/bank-account.component";
// import { BankCardsComponent } from "../components/common-components/bank-cards/bank-cards.component";


@NgModule({
  declarations: [
    // FinancialExpensesComponent,
    // FinancialExpensesNotPredictableCreateComponent,
    // EssentialExpensesCreateComponent,
    // BankAccountCardsComponent,
    // NavFinancialComponent,
    // FinancialDashComponent,
    // BankAccountComponent,
    // BankCardsComponent
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
    BankAccountService,
    FinancialExpensesService,
  ]
})

export class FinancialModule {

}
