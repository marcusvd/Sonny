import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CollectDeliverCreateResolver } from "src/components/out-sourced/collect-deliver-old/collect-deliver-create/resolver/collect-deliver.resolver";
import { CollectDeliverOldComponent } from "src/components/out-sourced/collect-deliver-old/collect-deliver-create/components/collect-deliver.component";
import { EletronicRepairComponent } from "src/components/out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { PartnerCreateComponent } from "../add/partner-create.component";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/components/add/collect-deliver-create.component";




const RoutesPartner: Routes = [
  {
    path: '', component: PartnerDashComponent, children: [
      { path: 'create-partner/:id', component: PartnerCreateComponent },
      { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent, resolve: { loaded: CollectDeliverCreateResolver } },
      { path: 'create-collect-deliver-old/:id', component: CollectDeliverOldComponent },
      { path: 'create-collect-deliver/:id', component: CollectDeliverCreateComponent },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
