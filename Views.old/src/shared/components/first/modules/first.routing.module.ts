import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from '../components/first.component';
 import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';


const routes: Routes = [
  // , canActivate: [UserIsAuthenticatedGuard]
   { path: 'first', component: FirstComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class FirstRoutingModule { }
