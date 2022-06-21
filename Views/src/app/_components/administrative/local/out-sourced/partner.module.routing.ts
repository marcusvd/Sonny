import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierListComponent } from "../providers/supplier/supplier-list/supplier-list.component";
import { CollectDeliverComponent } from "./collect-deliver/collect-deliver.component";
import { EletronicRepairComponent } from "./eletronic-repair/eletronic-repair.component";
import { PartnerCreateComponent } from "./partner-create/partner-create.component";
import { PartnerEditComponent } from "./partner-edit/partner-edit.component";
import { PartnerListListComponent } from "./partner-list-list/partner-list-list.component";
import { PartnerSupplierListComponent } from "./partner-supplier-list/partner-supplier-list.component";
import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { PartnerEditResolver } from "./resolvers/partner.edit.resolver";


const RoutesPartner: Routes = [

  {
    path: 'partners', component: PartnerSupplierListComponent,},
      {path: 'list', component: PartnerListListComponent},
      {path: 'collectdeliver', component: CollectDeliverComponent, resolve: {loaded: CollectDeliverResolver} },
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
