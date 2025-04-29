import { NgModule } from "@angular/core";

//MATERIAL
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule as MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule as MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule as MatInputModule } from '@angular/material/input'
import { MatCheckboxModule as MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule as MatRadioModule } from '@angular/material/radio'
import { MatDialogModule as MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule as MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule as MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule as MatListModule } from '@angular/material/list';
import { MatTableModule as MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule as MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatStepperModule } from '@angular/material/stepper'

import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule as MatButtonModule } from '@angular/material/button'
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule as MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule as MatChipsModule } from '@angular/material/chips';
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
