import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { FinancialDashComponent } from "../components/financial-dash/financial-dash.component";


const Routes: Routes = [
  {
    path: 'financial-dash', component: FinancialDashComponent, children: [
      { path: 'create', component: NavFinancialComponent }
    ]
  },

  // { path: 'dailyinflow', component: DailyInflowCreateComponent },
  // { path: 'dailyoutflow', component: DailyOutflowCreateComponent },
  // { path: 'typepay', component: TypePaymentCreateComponent },
  // { path: 'checkacc', component: CheckingAccountComponent },


  // { path: 'deviceslist/:id/list', component: DevicesListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(Routes)],
  exports: [RouterModule],
  providers: []
})


export class FinancialRoutingModule {

}
