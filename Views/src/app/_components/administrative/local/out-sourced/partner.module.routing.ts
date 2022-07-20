import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierListComponent } from "../providers/supplier/supplier-list/supplier-list.component";
import { CollectDeliverDashAllComponent } from "./collect-deliver-dash-all/collect-deliver-dash-all.component";
import { CollectDeliverDashMonthComponent } from "./collect-deliver-dash-month/collect-deliver-dash-month.component";
import { CollectDeliverComponent } from "./collect-deliver/collect-deliver.component";
import { EletronicRepairComponent } from "./eletronic-repair/eletronic-repair.component";
import { PartnerCreateComponent } from "./partner-create/partner-create.component";
import { PartnerEditComponent } from "./partner-edit/partner-edit.component";
import { PartnerListListComponent } from "./partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "./partner-list/partner-list.component";
// import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { PartnerEditResolver } from "./resolvers/partner.edit.resolver";


const RoutesPartner: Routes = [
  {
    path: 'partners', component: PartnerListComponent,},
      {path: 'list', component: PartnerListListComponent},
      // {path: 'delivercollect', component: CollectDeliverComponent, resolve: {loaded: CollectDeliverResolver} },
      {path: 'delivercollectall', component: CollectDeliverDashAllComponent },
      {path: 'delivercollectdashmonth', component: CollectDeliverDashMonthComponent },
      {path: 'eletronicrepair', component: EletronicRepairComponent},
      { path: 'supplier', component: SupplierListComponent },
      { path: 'partner/new', component: PartnerCreateComponent },
      { path: 'partner/:id/edit', component: PartnerEditComponent, resolve: { Partneredit: PartnerEditResolver } },
      { path: 'partner/:id/edit', component: PartnerEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class PartnerRoutingModule {
}
