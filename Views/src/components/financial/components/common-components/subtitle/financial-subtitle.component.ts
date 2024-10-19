import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { View } from 'src/shared/components/inheritance/view/view';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { FinancialSubtitleDto } from './financial-subtitle-dto';

@Component({
    selector: 'financial-subtitle',
    standalone: true,
    imports: [
        CommonModule,
        FlexLayoutModule,
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
export class FinancialSubtitleComponent extends View implements OnInit {

    @Input() statusCollection: FinancialSubtitleDto[] = [];
    // @Input() statusCollection: FinancialSubtitleDto[] = [
    //     { id: 1, name: 'Vencida', class: 'bg-color-expired', visible: true },
    //     { id: 2, name: 'Pendente', class: 'bg-color-will-expire', visible: true },
    //     { id: 3, name: 'Liquidada', class: 'bg-color-paid', visible: true }
    // ]

    @Input() defaultSubtitle: boolean = true;
    @Input() singleStatusSubtitle: boolean = false;
    @Input() expiresDate = new Date();

    // @Input() expired: boolean = false;
    // @Input() willExpire: boolean = false;
    // @Input() paid: boolean = false;


    get smallCurrentSizeScreen() {
        return this.currentScreenSize == 'small' ? 'row' : 'column';
    }

    get bigCurrentSizeScreen() {
        return this.currentScreenSize == 'large' ? 'row' : 'column';
    }


    constructor(override _breakpointObserver: BreakpointObserver
    ) { super(_breakpointObserver) }

    ngOnInit(): void {
        this.screen();
    }
}
