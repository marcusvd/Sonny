import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { BtnGComponent } from '../../../../../../../src/shared/components/btn-g/btn-g.component';
import { ListGComponent } from '../../../../../../../src/shared/components/list-g/list/list-g.component';
import { SubTitleComponent } from '../../../../../../../src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from '../../../../../../../src/shared/components/title/default-title/title.component';

export const ImportsListBankAccountCards:any[] =[
  CommonModule,
  MatCardModule,
  MatPaginatorModule,
  RouterModule,
  MatIconModule,
  ListGComponent,
  TitleComponent,
  SubTitleComponent,
  BtnGComponent,
]
