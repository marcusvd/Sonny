import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { ServiceBudgetListComponent } from "../components/container/service-budget-list.component";
import { ServicesBudgetListService } from "../services/services-budget-list.service";
import { PanelServicesComponent } from "../../panel-services/panel-services.component";



@NgModule({
  declarations: [
    ServiceBudgetListComponent,
    PanelServicesComponent
  ],
  imports: [
    //angular imports
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
  ],
  providers: [
    ServicesBudgetListService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BudgetServicesModule {

}
