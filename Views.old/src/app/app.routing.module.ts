import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "src/components/authentication/login/login.component";


const routes: Routes = [
  //{ path: '', redirectTo: 'side-nav/login', pathMatch: 'full' },
  //  { path: '', redirectTo: 'first', pathMatch: 'full' },
   { path: 'side-nav/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }



