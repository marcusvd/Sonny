import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD',
  },
  display: {
    dateInput: 'DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'date-just-day',
  standalone: true,
  imports: [
    CommonModule,
    
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  template: `
  <div *ngIf="formMain" [fxLayout]="layoutColumnRow">
    <mat-form-field appearance="outline" [formGroup]="formMain"  []="Width">
      <mat-label>{{labelTitle}}</mat-label>
      <input matInput  [matDatepicker]="picker" [placeholder]="placeholder" [formControlName]="formCtrlName">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker  #picker></mat-datepicker>
            <mat-error>
              <ng-content select="[validation-error]"></ng-content>
           </mat-error>
    </mat-form-field>
  </div>
        `,
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
  styles: [`

  `]
})





export class DateJustDayComponent {
  @Input() formCtrlName: string;
  @Input() placeholder: string;
  @Input() labelTitle: string;
  @Input() formMain: FormGroup;
  @Input() Width: string;
  @Input() layoutColumnRow: string;

}
