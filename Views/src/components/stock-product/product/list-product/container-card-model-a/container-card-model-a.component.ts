import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { LineDividerCardModelAComponent } from '../../../../../shared/components/card-g/card-g-model-a/card-line-divider-model-a-line/line-divider-card-model-a-line.component';
import { ContentCardModelAComponent } from '../../../../../shared/components/card-g/card-g-model-a/content-card-model-a/content-card-model-a.component';
import { FooterCardModelAComponent } from '../../../../../shared/components/card-g/card-g-model-a/footer-card-model-a/footer-card-model-a.component';
import { HeaderCardModelAComponent } from '../../../../../shared/components/card-g/card-g-model-a/header-card-model-a/header-card-model-a.component';

@Component({
    selector: 'container-card-model-a',
    imports: [
        CommonModule,
        MatIconModule,
        HeaderCardModelAComponent,
        ContentCardModelAComponent,
        FooterCardModelAComponent,
        LineDividerCardModelAComponent,
        BtnGComponent
    ],
    templateUrl: './container-card-model-a.component.html',
    styleUrls: ['./container-card-model-a.component.scss']
})
export class ContainerCardModelAComponent{
  @Input() entity: any;
}
