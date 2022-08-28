import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'expansion-panel-g',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.css']
})
export class ExpansionPanelComponent implements OnInit {

  public entities = [];

  @Input() panelTitle: string[] = [];
  @Input() panelDescription: string[] = [];
  @Input() panelBody: any[] = [];
  @Input() dataSourceInput = new Observable<any>();
  @Input() nameOfTabs: string[]=[]
  panelOpenState = false;

  constructor() { }






  ngOnInit(): void {
    console.log(this.panelTitle)
    this.dataSourceInput.subscribe(
      toView => {
        this.entities = toView;
      }
    )



  }








}
