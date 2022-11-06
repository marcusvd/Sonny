// import { Component, Input, OnInit, EventEmitter, Output, ContentChild } from '@angular/core';
// import { ContentDirective } from './content-directive';


// @Component({
//   selector: 'stepper-test',
//   template: `
//     <div>
//     <mat-vertical-stepper labelPosition="bottom" [linear]="true" (selectionChange)="indexStepEventChange($event)">

//       <mat-step *ngFor="let lable of this.stepLabelArray">
//         <ng-template matStepLabel>{{lable}}</ng-template>
//         <ng-container [ngTemplateOutlet]="content.templateRef"></ng-container>
//         <ng-template matStepContent >

//         <!-- <ng-content></ng-content> -->

// <!--
//         <div *ngIf="indexSelectedStep === 0">
//         <div>
//             000000000000000000000000000000000000000000000
//         </div>
//     </div>

//     <div *ngIf="indexSelectedStep === 1">
//         <div>
//             11111111111111111111111111111111111111111111
//         </div>
//     </div>

//     <div *ngIf="indexSelectedStep === 2">
//         <div>
//             22222222222222222222222222222222222222222222
//         </div>
//     </div>
//     <div *ngIf="indexSelectedStep === 3">
//         <div>
//             3333333333333333333333333333333
//         </div>
//     </div> -->





//        </ng-template>

//     </mat-step>
//     </mat-vertical-stepper>
//     </div>
//      `,
// })
// export class StepperTestComponent implements OnInit {

//   // @Input() stepLabel: string;
//   @Output() selectedStepIndex = new EventEmitter<number>();
//   @Input() stepLabelArray: string[] = [];

//   @ContentChild(ContentDirective) content: ContentDirective;

//   indexSelectedStep: number = 0;

//   constructor() { }


//   indexStepEventChange($event: any) {
//     const index: number = $event.selectedIndex;
//     this.indexSelectedStep = index;
//     //this.selectedStepIndex.emit(index);
//   }



//   ngOnInit(): void {
//     //console.log('CONTAINER',this.stepLabelArray)
//   }

// }
