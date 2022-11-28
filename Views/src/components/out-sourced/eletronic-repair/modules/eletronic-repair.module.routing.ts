import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";



import { PartnerCreateComponent } from "../../../partner/components/partner-create/component/partner-create.component";
import { PartnerListListComponent } from "../../../partner/components/partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "../../../partner/components/partner-list/partner-list.component";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";





const RoutesPartner: Routes = [
  {
    path: 'partners', component: PartnerListComponent,},
      {path: 'list', component: PartnerListListComponent},


      {path: 'eletronicrepair', component: EletronicRepairComponent},
      { path: 'partner/new', component: PartnerCreateComponent },

]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class EletronicRepairModuleRouting {
}
