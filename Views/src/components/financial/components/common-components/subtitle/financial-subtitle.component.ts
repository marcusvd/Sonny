
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';


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
    styles: [`
    .dimensions-subtitle {
        width: 10px;
        height: 10px;
    }
    .dimensions-subtitle-single-status {
        width: 50px;
        height: 50px;
    }

    .space-subtitle {
        margin-top: -4px;
        padding-left: 3px;
    }

    #space-components {
        height: 20px;
    }

.bg-color-expired {
    background-color: red;
}

.bg-color-will-expire {
    background-color: orange;
}

.bg-color-paid {
    background-color: green;
}

#whenSmallSpaceTop{
    padding-top:10px;
}


.monthColorNameExpired{
    color: red;
}

.monthColorNameWillExpire{
     color: orange;
}
.monthColorNamePaid{
    color: green;
}

.subtitleRow{
font-weight: bolder; padding-top: 13px;
}

.subtitleColumn{
font-weight: bolder; padding-top: 13px; margin-left: -25px;
}

  `],
    providers: [],
})
export class FinancialSubtitleComponent  implements OnInit {

    @Input() statusCollection: FinancialSubtitleDto[] = [];


    @Input() title: string = '';
    @Input() defaultSubtitle: boolean = true;
    @Input() singleStatusSubtitle: boolean = false;
    @Input() expiresDate = new Date();



    constructor(
    ) {}

    ngOnInit(): void {

    }
}
