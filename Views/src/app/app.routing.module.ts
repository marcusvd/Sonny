import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from "./app.component";
import { FirstComponent } from "src/shared/components/first/components/first.component";


const routes: Routes = [
   { path: '', redirectTo: 'first', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }



