import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TestsComponent } from "src/tests/tests.component";

const routes: Routes = [

  {path:'tests2', component: TestsComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollectDeliverCreateRoutingModule {
}
