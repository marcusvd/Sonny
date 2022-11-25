import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';

import { ServiceBudgetDto } from 'src/components/services-provision/budget/dto/service-budget-dto';

@Component({
  selector: 'expansion-panel-g',
  templateUrl: './expansion-panel-g.component.html',
  styleUrls: ['./expansion-panel-g.component.css']
})
export class ExpansionPanelGComponent implements OnInit, OnChanges {

  // public entities = [];
  // @Input() entity: any;
  @Input() panelTitle: string;
  @Output() entityEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Input() textPanelDescription: string;
  @Input() iconPanelDescription: string;
  @Input() fontStyle: string;
  // 'font-size: 1.2rem; color: cornflowerblue;';
  // @Input() dataSourceInput = new Observable<any>();

  panelOpenState = false;

  constructor() { }

  // entityEmit() {
  //   this.entityEventEmitter.emit(this.entity)
  // }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    // this.dataSourceInput.subscribe(
    //   toView => {
    //     this.entities = toView;
    //   }
    // )

  }
}
