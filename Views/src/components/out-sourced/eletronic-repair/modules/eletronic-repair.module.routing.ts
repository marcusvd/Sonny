import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { PartnerCreateComponent } from "../../../partner/components/partner-create/component/partner-create.component";
import { PartnerListListComponent } from "../../../partner/components/partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "../../../partner/components/partner-list/partner-list.component";
import { EletronicRepairCreateResolver } from "../../resolvers/eletronic-repair.resolver";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";





const routes: Routes = [
{ path: 'eletronicrepair', component: EletronicRepairComponent, resolve: {loaded: EletronicRepairCreateResolver}},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EletronicRepairModuleRouting {
}
