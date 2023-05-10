import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { EletronicRepairComponent } from "../../out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerCreateComponent } from "../components/partner-create/component/partner-create.component";
import { PartnerDashComponent } from "../components/partner-dash/partner-dash.component";
import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/collect-deliver-create/componente/collect-deliver.component";
import { CollectDeliverCreateResolver } from "src/components/out-sourced/collect-deliver/collect-deliver-create/resolver/collect-deliver.resolver";
import { EletronicRepairCreateResolver } from "src/components/out-sourced/resolvers/eletronic-repair.resolver";



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
