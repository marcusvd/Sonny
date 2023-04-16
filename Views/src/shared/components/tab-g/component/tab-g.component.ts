import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'tab-g',
  templateUrl: './tab-g.component.html',
  styleUrls: ['./tab-g.component.css']
})
export class TabGComponent implements OnInit, AfterContentInit {

  @Input() titleTabs: string[] = [];
  @Input() entities: any[] = [];
  @Output() tabIndexEvt = new EventEmitter();

  entity: any;
  indexTab: number = 0;

  tabIndex($event:any) {
    this.tabIndexEvt.emit($event)
  }

  selected = new UntypedFormControl(0);

  constructor() { }
  ngAfterContentInit(): void {
    this.entities.forEach((t: any) => {
      this.entity = t;
      console.log(t)
    })
  }

  ngOnInit(): void {

  }

}
