
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FinancialSubtitleDto } from './financial-subtitle-dto';

@Component({
    selector: 'financial-subtitle',
    standalone: true,
    imports: [
        CommonModule,

        CommonModule,
        PtBrDatePipe,
        NgFor,
        NgIf
    ],
    templateUrl: './financial-subtitle.component.html',
    styleUrls: ['./financial-subtitle.component.scss'],
    providers: [],
})
export class FinancialSubtitleComponent  {

    @Input() statusCollection: FinancialSubtitleDto[] = [];
    @Input() title: string = '';
    @Input() defaultSubtitle: boolean = true;
    @Input() singleStatusSubtitle: boolean = false;
    @Input() expiresDate = new Date();

}
