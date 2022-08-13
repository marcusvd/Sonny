import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ClientListComponent } from 'src/components/client/client-list/component/client-list.component';

const routes: Routes = [
  { path: 'clientlist', component: ClientListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }



