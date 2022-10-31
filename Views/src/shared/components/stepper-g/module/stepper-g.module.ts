import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperGComponent } from '../components/stepper-g.component';
import { MaterialModule } from 'src/shared/modules/material.module';
import { StepperGContainerComponent } from '../components/stepper-g-container.component';
import { StepperTestComponent } from '../components/stepper-test';
import { ContentDirective } from '../components/content-directive';

@NgModule({
  declarations: [
    StepperGComponent,
    StepperGContainerComponent,
    StepperTestComponent,
    ContentDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
   ],
  exports: [
    StepperGComponent,
    StepperGContainerComponent,
    StepperTestComponent,
    ContentDirective
  ],
  providers: [
    StepperGContainerComponent
  ],
})
export class StepperGModule {}
