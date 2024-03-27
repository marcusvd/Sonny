import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
import { CustomersListComponent } from "../components/customers-list/customers-list.component";
import { CustomerCreateComponent } from "../components/add/customer-create.component";
import { CustomersLengthResolver } from "src/shared/resolvers/customers-length.resolver";


const routes: Routes = [
  {
    path: '', component: CustomerDashComponent, children: [
      { path: 'create', component: CustomerCreateComponent },
      { path: 'list/:id', component: CustomersListComponent, resolve: { loaded: CustomersLengthResolver } }
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
