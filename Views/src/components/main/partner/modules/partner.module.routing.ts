import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


// import { CollectDeliverCreateComponent } from "src/components/out-sourced/collect-deliver/components/add/collect-deliver-create.component";
// import { CollectDeliverEditComponent } from "src/components/out-sourced/collect-deliver/components/edit/collect-deliver-edit.component";
// import { CollectDeliverListComponent } from "src/components/out-sourced/collect-deliver/components/list/collect-deliver-list.component";
// import { EletronicRepairComponent } from "src/components/out-sourced/eletronic-repair/component/eletronic-repair.component";
// import { GetTotalEntitiesResolver } from "src/shared/components/grid-list-common/helpers/grid-list-common-helper";
import { AddPartnerComponent } from "../add/add-partner.component";
import { PartnerEditComponent } from "../edit/partner-edit.component";
import { ListPartnerComponent } from "../list/list-partner.component";




const RoutesPartner: Routes = [


      { path: 'create-partner', component: AddPartnerComponent },
      // { path: 'list-partner/:id', component: ListPartnerComponent, resolve:{loaded: GetTotalEntitiesResolver}, data:{url:'partners/GetTotalPartnersByIdCompanyAsync'}},
      { path: 'edit-partner/:id', component: PartnerEditComponent},
      // { path: 'create-eletronic-repair/:id', component: EletronicRepairComponent },
      // //outsourced
      // { path: 'create-collect-deliver', component: CollectDeliverCreateComponent },
      // { path: 'list-collect-deliver/:id', component: CollectDeliverListComponent },
      // { path: 'edit-collect-deliver/:id', component: CollectDeliverEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule],
  //  providers: [GetTotalEntitiesResolver]
})

export class PartnerRoutingModule {
}
