import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { ListCustomersComponent } from "../components/list/list-customers.component";
import { AddCustomerComponent } from "../components/add/add-customer.component";
// import { CustomerViewComponent } from "../components/view/customer-view.component";
import { EditCustomerComponent } from "../components/edit/edit-customer.component";



const routes: Routes = [
  { path: 'create', component: AddCustomerComponent },
  // { path: 'view/:id', component: CustomerViewComponent },
  { path: 'edit/:id', component: EditCustomerComponent },
  { path: 'list/:id', component: ListCustomersComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomerRoutingModule {

}
