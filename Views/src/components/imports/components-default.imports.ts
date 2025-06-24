import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';


import { BtnGComponent } from '../../shared/components/btn-g/btn-g.component';
import { TitleComponent } from '../../shared/components/title/default-title/title.component';
import { ListGComponent } from '../../shared/components/list-g/list/list-g.component';
import { PtBrDatePipe } from '../../shared/pipes/pt-br-date.pipe';
import { PtBrCurrencyPipe } from '../../shared/pipes/pt-br-currency.pipe';
import { DefaultComponent } from '../../shared/components/default-component/default-component';
import { BtnGDynamicComponent } from 'src/shared/components/btn-g-dynamic/btn-g-dynamic.component';

export const ListDefaultImports: any[] = [
  CommonModule,
  MatCardModule,
  MatPaginatorModule,
  MatIconModule,
  MatDividerModule,
  TitleComponent,
  BtnGDynamicComponent,
  BtnGComponent,
  ListGComponent,
  DefaultComponent,
  MatMenuModule,
  MatRadioModule,
  RouterModule
]
export const ListDefaultProviders: any[] = [
  PtBrDatePipe,
  PtBrCurrencyPipe
]

export const AddDefaultImports: any[] = [
  CommonModule,
  DefaultComponent,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatCardModule,
  ReactiveFormsModule,
  FormsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatTooltipModule,
  CurrencyMaskModule,
  BtnGComponent,
  MatMenuModule,
  MatRadioModule,
  RouterModule,
  PtBrDatePipe,
  PtBrCurrencyPipe
]
export const AddDefaultProviders: any[] = [
  PtBrDatePipe,
  PtBrCurrencyPipe
]
