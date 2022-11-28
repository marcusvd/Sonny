import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from "./app.component";

const routes: Routes = [
  { path: 'financial', loadChildren: () => import('../components/financial/modules/financial.module').then(x => x.FinancialModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }



