import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NavFinancialComponent } from "../components/nav-financial/nav-financial.component";
import { TypePaymentCreateComponent } from "../components/type-payment/type-payment-create/type-payment-create.component";
import { CheckingAccountComponent } from "../components/checking-account/component/cheking-account.component";


const Routes: Routes = [
  { path: '', component: NavFinancialComponent } ,
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
