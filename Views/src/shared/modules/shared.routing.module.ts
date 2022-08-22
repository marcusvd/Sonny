import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ExpansionPanelComponent } from "../components/expansion-panel-g/component/expansion-panel.component";
import { TabGroupGComponent } from "../components/tab-group-g/component/tab-group-g.component";



const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }



