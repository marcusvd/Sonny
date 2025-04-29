import { NgModule } from "@angular/core";

//MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatStepperModule } from '@angular/material/stepper'

import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import {ScrollingModule} from '@angular/cdk/scrolling';

//datepiker and your dependencies
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
  ],
  imports: [
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatStepperModule,
    
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ScrollingModule,

    //TESTING

    MatNativeDateModule,
  ],
  exports: [
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatStepperModule,
    
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ScrollingModule,
    //TESTING
    MatNativeDateModule,




  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})

export class MaterialModule {

}
