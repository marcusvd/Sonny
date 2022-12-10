import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { PartnerCreateComponent } from "../../partner-create/partner-create.component";
// import { PartnerEditComponent } from "../../../../../partner/partner-edit/partner-edit.component";
// import { PartnerListListComponent } from "../../partner-list-list/partner-list-list.component";
// import { PartnerListComponent } from "../../partner-list/partner-list.component";
// import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";

import { CollectDeliverCreateResolver} from "../resolver/collect-deliver.resolver";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";




const routes: Routes = [
      {path: 'delivercollect', component: CollectDeliverCreateComponent, resolve: {loaded: CollectDeliverCreateResolver} },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollectDeliverCreateRoutingModule {
}
