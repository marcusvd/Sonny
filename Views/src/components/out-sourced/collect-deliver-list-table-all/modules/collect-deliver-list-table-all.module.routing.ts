import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EletronicRepairComponent } from "../../eletronic-repair/component/eletronic-repair.component";

import { PartnerCreateComponent } from "../../../partner/components/partner-create/component/partner-create.component";

import { PartnerListListComponent } from "../../../partner/components/partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "../../../partner/components/partner-list/partner-list.component";
import { PartnerEditResolver } from "../../resolvers/partner.edit.resolver";
import { CollectDeliverListTableAllComponent } from "../component/collect-deliver-dash-all.component";
import { CollectDeliverResolver } from "../resolvers/collect-deliver.resolver";
import { CollectDeliverCreateComponent } from "../../collect-deliver-create/componente/collect-deliver.component";




const RoutesPartner: Routes = [
  { path: 'partners', component: PartnerListComponent, },
  { path: 'list', component: PartnerListListComponent },
  { path: 'delivercollectall', component: CollectDeliverListTableAllComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class CollectDeliverListTableAllModuleRouting {
}
