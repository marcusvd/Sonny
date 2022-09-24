import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'expansion-panel-g',
  templateUrl: './expansion-panel-g.component.html',
  styleUrls: ['./expansion-panel-g.component.css']
})
export class ExpansionPanelGComponent implements OnInit {

  public entities = [];

  @Input() panelTitle: string;
  @Input() panelDescription: string;
  @Input() dataSourceInput = new Observable<any>();
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
    this.dataSourceInput.subscribe(
      toView => {
        this.entities = toView;
      }
    )



  }








}
