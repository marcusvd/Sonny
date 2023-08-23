import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { EletronicRepairCreateResolver } from "../../resolvers/eletronic-repair.resolver";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";





const routes: Routes = [
// { path: 'eletronicrepair', component: EletronicRepairComponent, resolve: {loaded: EletronicRepairCreateResolver}},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EletronicRepairModuleRouting {
}
