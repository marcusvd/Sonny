import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { CollectDeliverCreateResolver } from "src/components/out-sourced/collect-deliver/collect-deliver-create/resolver/collect-deliver.resolver";
import { EletronicRepairCreateResolver } from "src/components/out-sourced/resolvers/eletronic-repair.resolver";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/collect-deliver-create/components/collect-deliver.component";
import { EletronicRepairComponent } from "src/components/out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerDashComponent } from "../dash/partner-dash.component";
import { PartnerCreateComponent } from "../add/partner-create.component";



const RoutesPartner: Routes = [
  { path: '', component: PartnerDashComponent, children:[
    { path: 'create-partner/:id', component: PartnerCreateComponent },
    { path: 'create-eletronic-repair', component: EletronicRepairComponent, resolve:{loaded: EletronicRepairCreateResolver} },
    { path: 'create-collect-deliver/:id', component: CollectDeliverCreateComponent, resolve: {loaded:CollectDeliverCreateResolver}},
  ] },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
