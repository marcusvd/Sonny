import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DailyInflowCreateComponent } from "../components/daily/in/daily-inflow-create/daily-inflow-create.component";
import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";


import { MonthlyOutFlowCreateComponent } from "../components/monthly/monthly-outflow-create/monthly-outflow-create.component";
import { DailyOutflowCreateComponent } from "../components/daily/out/daily-outflow-create/daily-outflow-create.component";
import { TypePaymentCreateComponent } from "../components/type-payment/type-payment-create/type-payment-create.component";
import { CheckingAccountComponent } from "../components/checking-account/cheking-account.component";
import { CardComponent } from "../components/card/card.component";


const Routes: Routes = [
  { path: 'financial', component: NavFinancialComponent,
   children:[
     { path: 'dailyinflow', component: DailyInflowCreateComponent },
     { path: 'dailyoutflow', component: DailyOutflowCreateComponent },
     { path: 'monthlyoutflow', component:  MonthlyOutFlowCreateComponent},
     { path: 'typepay', component:  TypePaymentCreateComponent},
     {path: 'checkacc', component: CheckingAccountComponent},
     {path: 'card', component: CardComponent}
  ]
 },
  // { path: 'deviceslist/:id/list', component: DevicesListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
  providers: []
})


export class FinancialRoutingModule {

}
