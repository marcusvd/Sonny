import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AddCollectDeliverComponent } from "../../../components/out-sourced/collect-deliver/components/add/add-collect-deliver.component";
import { EditCollectDeliverComponent } from "../../../components/out-sourced/collect-deliver/components/edit/edit-collect-deliver.component";
import { ListCollectDeliverComponent } from "../../../components/out-sourced/collect-deliver/components/list/list-collect-deliver.component";

import { ListCollectDeliverMonthComponent } from "../collect-deliver/components/list-month/list-collect-deliver-month.component";


const RoutesPartner: Routes = [
  { path: 'add-collect-deliver', component: AddCollectDeliverComponent },
  { path: 'list-collect-deliver-all-months', component: ListCollectDeliverMonthComponent },
  { path: 'list-collect-deliver-by-month/:id', component: ListCollectDeliverComponent },
  { path: 'edit-collect-deliver/:id', component: EditCollectDeliverComponent }
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule],
  providers: []
})

export class OutsourcedRoutingModule {
}
