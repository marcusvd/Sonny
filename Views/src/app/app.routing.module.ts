import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from "./_shared/components/address/address.component";

import { ContactComponent } from "./_shared/components/contact/contact.component";

const routes: Routes = [
  {path: 'address', component: AddressComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



