import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';


import { View } from 'src/shared/components/inheritance/view/view';

@Component({
    selector: 'financial-subtitle-static',
    standalone: true,
    imports: [
        CommonModule,
        FlexLayoutModule,
        CommonModule,
        NgFor,
        NgIf
    ],
    template: `
    <div id="space-components" [fxLayout]="fxLayoutPosition" fxLayoutGap="10" fxFlex>
    <div fxLayout="row">
        <span class="dimensions-subtitle bg-color-expired"></span><span class="space-subtitle">Vencida</span>
    </div>
    <div class="small-space-horizontal-beteween-fields"></div>
    <div fxLayout="row">
        <span class="dimensions-subtitle bg-color-will-expire"></span><span class="space-subtitle">Pendente</span>
    </div>
    <div class="small-space-horizontal-beteween-fields"></div>
    <div fxLayout="row">
        <span class="dimensions-subtitle bg-color-paid"></span><span class="space-subtitle">Liquidada</span>
    </div>
    </div>
        `,
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
export class FinancialSubtitleStaticComponent extends View implements OnInit {

  


    constructor(override _breakpointObserver: BreakpointObserver
    ) { super(_breakpointObserver) }

    ngOnInit(): void {
        this.screen();
    }
}
