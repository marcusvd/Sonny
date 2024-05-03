import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { EletronicRepairComponent } from "src/components/out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { PartnerCreateComponent } from "../add/partner-create.component";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/components/add/collect-deliver-create.component";
import { CollectDeliverListComponent } from "src/components/out-sourced/collect-deliver/components/list/collect-deliver-list.component";
import { CollectDeliverEditComponent } from "src/components/out-sourced/collect-deliver/components/edit/collect-deliver-edit.component";
import { CollectDeliverViewComponent } from "src/components/out-sourced/collect-deliver/components/view/collect-deliver-view.component";




const RoutesPartner: Routes = [
  {
    path: '', component: PartnerDashComponent, children: [
      { path: 'create-partner/:id', component: PartnerCreateComponent },
      { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent },

      { path: 'create-collect-deliver', component: CollectDeliverCreateComponent },
      { path: 'list-collect-deliver/:id', component: CollectDeliverListComponent },
      { path: 'edit-collect-deliver/:id', component: CollectDeliverEditComponent },
      { path: 'view-collect-deliver/:id', component: CollectDeliverViewComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
