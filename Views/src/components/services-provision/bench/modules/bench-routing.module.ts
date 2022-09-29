import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routesOs: Routes = []


@NgModule({
  imports: [RouterModule.forChild(routesOs)],
  exports: [RouterModule]
})

export class BenchRoutingModule {

}
