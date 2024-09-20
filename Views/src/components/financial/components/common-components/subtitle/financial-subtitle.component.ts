import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { View } from 'src/shared/components/inheritance/view/view';

@Component({
    selector: 'financial-subtitle',
    standalone: true,
    imports: [
        CommonModule,
        FlexLayoutModule,
        CommonModule
    ],
    templateUrl:'./financial-subtitle.component.html',
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

  `],
    providers: [],
})
export class FinancialSubtitleComponent extends View implements OnInit {

    @Input() defaultSubtitle: boolean = true;
    @Input() singleStatusSubtitle: boolean = false;
    
    @Input() expired: boolean = false;
    @Input() willExpire: boolean = true;
    @Input() paid: boolean = false;

    

    constructor(override _breakpointObserver: BreakpointObserver
    ) { super(_breakpointObserver) }

    ngOnInit(): void {
        if(this.singleStatusSubtitle)
        this.defaultSubtitle = false;
       this.screen();
    }
}
