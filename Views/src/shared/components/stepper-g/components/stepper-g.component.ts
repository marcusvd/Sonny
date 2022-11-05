import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { StepperGContainerComponent } from './stepper-g-container.component';


@Component({
  selector: 'stepper-g',
  templateUrl: './stepper-g.component.html',
  styleUrls: ['./stepper-g.component.css'],
  providers:[]
})
export class StepperGComponent implements OnInit, AfterContentInit, AfterViewInit {

  stepLabel: string;
  stepLabelArray: string[] = [];


  @Output() selectedStepIndex = new EventEmitter<number>();
  //@ContentChildren(StepperGContainerComponent) public container: QueryList<StepperGContainerComponent>;

  constructor(private _stepperGContainerComponent: StepperGContainerComponent) { }


  ngAfterViewInit(): void {
    console.log(this._stepperGContainerComponent.stepLabelArray)
  }



  ngAfterContentInit(): void {
    // this.container.forEach(item => {
    //   this.stepLabelArray = item.stepLabelArray;
    // //  console.log()
    // })
    console.log(this._stepperGContainerComponent.stepLabelArray)
  }

  //



  indexStepEventChange($event: any) {
    const index: number = $event.selectedIndex;
    this.selectedStepIndex.emit(index);
  }

  ngOnInit(): void {
    console.log(this._stepperGContainerComponent.stepLabelArray)

  }

}