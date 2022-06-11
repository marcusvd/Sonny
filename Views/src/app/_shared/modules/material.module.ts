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
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatStepperModule } from '@angular/material/stepper'
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button'
import { MatMenuModule } from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
//datepiker and your dependencies
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


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
    MatGridListModule,
    MatStepperModule,
    MatFileUploadModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,

  ],
  exports: [
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
    MatGridListModule,

    MatStepperModule,
    MatFileUploadModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatTreeModule,
    MatMenuModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,



  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})

export class MaterialModule {

}
