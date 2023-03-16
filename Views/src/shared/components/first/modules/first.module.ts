import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/shared/modules/material.module';
import { FirstRoutingModule} from './first.routing.module';
import { FirstComponent } from '../components/first.component';



@NgModule({
  declarations: [
    FirstComponent,
  ],
  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FirstRoutingModule,
    //MY IMPORTS
    MaterialModule
  ],
  exports: [
    FirstComponent,
  ]
})
export class FirstModule { }
