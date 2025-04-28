import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from '../user/user-profile.component';
import { ProfileLoadResolver } from '../resolve/profile-load.resolver';

const routes: Routes = [{path: '', component: UserProfileComponent, resolve:{loaded: ProfileLoadResolver} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
