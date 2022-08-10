import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierListComponent } from "../../../providers/supplier/components/supplier-list/supplier-list.component";

// import { PartnerCreateComponent } from "../../partner-create/partner-create.component";
// import { PartnerEditComponent } from "../../../../../partner/partner-edit/partner-edit.component";
// import { PartnerListListComponent } from "../../partner-list-list/partner-list-list.component";
// import { PartnerListComponent } from "../../partner-list/partner-list.component";
// import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { PartnerEditResolver } from "../../resolvers/partner.edit.resolver";
import { CollectDeliverListTableAllComponent } from "../../collect-deliver-list-table-all/component/collect-deliver-dash-all.component";
import { EletronicRepairComponent } from "../../eletronic-repair/component/eletronic-repair.component";
import { PartnerListComponent } from "src/components/partner/components/partner-list/partner-list.component";
import { PartnerListListComponent } from "src/components/partner/components/partner-list-list/partner-list-list.component";
import { PartnerCreateComponent } from "src/components/partner/components/partner-create/partner-create.component";
import { PartnerEditComponent } from "src/components/partner/components/partner-edit/partner-edit.component";




const RoutesPartner: Routes = [
  {
    path: 'partners', component: PartnerListComponent,},
      {path: 'list', component: PartnerListListComponent},
      {path: 'delivercollectall', component: CollectDeliverListTableAllComponent },

      {path: 'eletronicrepair', component: EletronicRepairComponent},
      { path: 'supplier', component: SupplierListComponent },
      { path: 'partner/new', component: PartnerCreateComponent },
      { path: 'partner/:id/edit', component: PartnerEditComponent, resolve: { Partneredit: PartnerEditResolver } },

]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class CollectDeliverCreateModuleRouting {
}
