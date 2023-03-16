import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Components
import { CustomerRoutingModule } from "./customer.routing.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { AddressComponent } from "src/shared/components/address/component/address.component";
import { CustomerCreateComponent } from "../components/customer-create/customer-create.component";
import { CustomerDashComponent } from "../components/customer-dash/customer-dash.component";
import { CustomersListComponent } from "../components/customers-list/customers-list.component";


@NgModule({
  declarations: [
    CustomerCreateComponent,
    CustomerDashComponent,
    CustomersListComponent,
    // ClientEditComponent,
    // TestComponent,
  ],
  imports: [
    CommonModule,
    //BrowserAnimationsModule,
    ReactiveFormsModule,
    //MY IMPORTS
    SharedModule,
    CustomerRoutingModule,
  ],
  exports: [],
  providers: [
    // CustomerCreateService,
    // ContactService,
    // AddressService,
    // AddressComponent
  ],
})

export class CustomerModule {

}
