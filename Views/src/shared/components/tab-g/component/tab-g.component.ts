import { outputAst } from '@angular/compiler';
import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'tab-g',
  templateUrl: './tab-g.component.html',
  styleUrls: ['./tab-g.component.css']
})
export class TabGComponent implements OnInit, AfterContentInit {

  @Input() titleTabs: string[] = [];
  // @Input() bodyTabs: any;
  @Input() entities: any[] = [];
  @Output() tabIndexEvt = new EventEmitter();
  // @Input() entities:Observable<any>;

  entity: any;
  indexTab: number = 0;

  tabIndex($event) {
    this.tabIndexEvt.emit($event)
  }


  selected = new FormControl(0);


  // addTab(selectAfterAdding: boolean) {
  //   this.titleTabs.push('New');

  //   if (selectAfterAdding) {
  //     this.selected.setValue(this.titleTabs.length - 1);
  //   }
  // }

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
