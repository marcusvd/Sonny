import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from "./_shared/components/address/component/address.component";


import { ContactComponent } from "./_shared/components/contact/component/contact.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



