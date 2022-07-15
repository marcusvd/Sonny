import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CollectDeliverListService } from '../services/collect-deliver-list.service';



@Component({
  selector: 'app-collect-deliver-dash-month',
  templateUrl: './collect-deliver-dash-month.component.html',
  styleUrls: ['./collect-deliver-dash-month.component.css']
})
export class CollectDeliverDashMonthComponent implements OnInit {


  dataSource: MatTableDataSource<ToView>;

  displayedColumns: string[] = ['subject',
    'start',
    'source',
    'destiny']
  constructor(private _listService: CollectDeliverListService) {

  }



  public ELEMENTS: ToView[] = [{ source: 'Microsoft', destiny: 'NoStop Ti - Matriz', start: new Date('2022-07-15T00:00:00'), subject: 'Esta lento' },
  { source: 'Microsoft', destiny: 'NoStop Ti - Matriz', start: new Date('2022-07-15T00:00:00'), subject: 'Esta lento' },
  { source: 'Microsoft', destiny: 'NoStop Ti - Matriz', start: new Date('2022-07-15T00:00:00'), subject: 'Esta lento' }]





  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<ToView>(this.ELEMENTS);
  }

}


/** Builds and returns a new User. */


export interface ToView {
  subject: string;
  start: Date;
  source: string;
  destiny: string;
}
