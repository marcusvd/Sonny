import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CustomerCreateComponent } from "../add/customer-create.component";
import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
import { CustomersListComponent } from "../components/customers-list/customers-list.component";


const routes: Routes = [
  {
    path: '', component: CustomerDashComponent, children: [
      { path: 'create', component: CustomerCreateComponent },
      { path: 'list', component: CustomersListComponent }
    ]
 },

  // ,
  // { path: 'clientlist', component: ClientListComponent },
  // { path: 'clientlist', component: ClientListComponent },
  // { path: 'tests', component: ContactComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomerRoutingModule {

}
