import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { EletronicRepairComponent } from "../../out-sourced/eletronic-repair/component/eletronic-repair.component";
import { PartnerCreateComponent } from "../components/partner-create/component/partner-create.component";
import { PartnerListListComponent } from "../components/partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "../components/partner-list/partner-list.component";
import { PartnerEditResolver } from "../../out-sourced/resolvers/partner.edit.resolver";



const RoutesPartner: Routes = [
  { path: 'partner/new', component: PartnerCreateComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
