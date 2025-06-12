
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


import { PtBrDatePipe } from '../../../../../shared/pipes/pt-br-date.pipe';
import { SubtitleCollectDeliverDto } from './subtitle-collect-deliver-dto';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'subtitle-collect-deliver',
    standalone: true,
    imports: [
        CommonModule,
        CommonModule,
        PtBrDatePipe,
        MatIconModule,
        NgFor,
        NgIf
    ],
    templateUrl: './subtitle-collect-deliver.component.html',
    styleUrls: ['./subtitle-collect-deliver.component.scss'],
    providers: [],
})
export class SubtitleCollectDeliverComponent  {

    @Input() statusCollection: SubtitleCollectDeliverDto[] = [];
    @Input() title: string = '';
    @Input() defaultSubtitle: boolean = true;
    @Input() singleStatusSubtitle: boolean = false;
    @Input() expiresDate = new Date();

}
