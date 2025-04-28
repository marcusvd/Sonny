import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/components/add/collect-deliver-create.component";
import { CollectDeliverEditComponent } from "src/components/out-sourced/collect-deliver/components/edit/collect-deliver-edit.component";
import { CollectDeliverListComponent } from "src/components/out-sourced/collect-deliver/components/list/collect-deliver-list.component";
import { CollectDeliverViewComponent } from "src/components/out-sourced/collect-deliver/components/view/collect-deliver-view.component";
import { GetTotalEntitiesResolver } from "src/shared/components/grid-list-common/helpers/grid-list-common-helper";
import { OutsourcedDashComponent } from "../dash/out-sourced-dash.component";
import { ListCollectDeliverMonthComponent } from "../collect-deliver/components/list-month/list-collect-deliver-month.component";


const RoutesPartner: Routes = [
  {
    path: '', component: OutsourcedDashComponent, children: [

      // { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent },
      //outsourced
      { path: 'add-collect-deliver', component: CollectDeliverCreateComponent },
      { path: 'list-collect-deliver-all-months', component: ListCollectDeliverMonthComponent },
       { path: 'list-collect-deliver-by-month/:id', component: CollectDeliverListComponent },
      { path: 'edit-collect-deliver/:id', component: CollectDeliverEditComponent },
      { path: 'view-collect-deliver/:id', component: CollectDeliverViewComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule],
   providers: [GetTotalEntitiesResolver]
})

export class OutsourcedRoutingModule {
}
