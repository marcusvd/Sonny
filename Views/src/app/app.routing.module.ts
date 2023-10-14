import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from "./app.component";
import { BenchBudgetResolver } from "src/components/bench-budget-service/resolvers/bench-budget.resolver";

const routes: Routes = [
  { path: '', redirectTo: 'first', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }



