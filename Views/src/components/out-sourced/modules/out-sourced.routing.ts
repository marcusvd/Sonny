import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { AddCollectDeliverComponent } from "../../../components/out-sourced/collect-deliver/components/add/add-collect-deliver.component";
import { CollectDeliverEditComponent } from "../../../components/out-sourced/collect-deliver/components/edit/collect-deliver-edit.component";
import { CollectDeliverListComponent } from "../../../components/out-sourced/collect-deliver/components/list/collect-deliver-list.component";
import { CollectDeliverViewComponent } from "../../../components/out-sourced/collect-deliver/components/view/collect-deliver-view.component";
import { GetTotalEntitiesResolver } from "../../../shared/components/grid-list-common/helpers/grid-list-common-helper";
import { ListCollectDeliverMonthComponent } from "../collect-deliver/components/list-month/list-collect-deliver-month.component";


const RoutesPartner: Routes = [
  { path: 'add-collect-deliver', component: AddCollectDeliverComponent },
  { path: 'list-collect-deliver-all-months', component: ListCollectDeliverMonthComponent },
  { path: 'list-collect-deliver-by-month/:id', component: CollectDeliverListComponent },
  { path: 'edit-collect-deliver/:id', component: CollectDeliverEditComponent },
  { path: 'view-collect-deliver/:id', component: CollectDeliverViewComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule],
  providers: [GetTotalEntitiesResolver]
})

export class OutsourcedRoutingModule {
}
