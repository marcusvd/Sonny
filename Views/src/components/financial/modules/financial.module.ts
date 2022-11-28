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
import { FinancingLoansComponent } from "../components/financing-loans/components/create/financing-loans.component";
import { EssentialExpensesCreateComponent } from "../components/essential-expenses/components/create/essential-expenses-create.component";
import { FinancingLoansService } from "../components/financing-loans/services/financing-loans.service";


@NgModule({
  declarations: [
    FinancingLoansComponent,
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
    TypePayCrudService,
    CheckingAccountService,
    FinancingLoansService,
  ]
})

export class FinancialModule {

}
