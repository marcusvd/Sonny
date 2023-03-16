import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from "./app.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // , {preloadingStrategy:PreloadAllModules}
  exports: [RouterModule]
})
export class AppRoutingModule { }



