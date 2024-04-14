import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CollectDeliverCreateResolver } from "src/components/out-sourced/collect-deliver/collect-deliver-create/resolver/collect-deliver.resolver";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/collect-deliver-create/components/collect-deliver.component";
import { EletronicRepairComponent } from "src/components/out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { PartnerCreateComponent } from "../add/partner-create.component";
import { CollectDeliverV2Component } from "src/components/out-sourced/collect-deliver-v2/collect-deliver-v2.component";



const RoutesPartner: Routes = [
  {
    path: '', component: PartnerDashComponent, children: [
      { path: 'create-partner/:id', component: PartnerCreateComponent },
      { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent },
      { path: 'create-collect-deliver/:id', component: CollectDeliverCreateComponent },
      { path: 'create-collect-deliver-2/:id', component: CollectDeliverV2Component },
//       { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent, resolve: { loaded: CollectDeliverCreateResolver } },
// { path: 'create-collect-deliver/:id', component: CollectDeliverCreateComponent, resolve: { loaded: CollectDeliverCreateResolver } },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
