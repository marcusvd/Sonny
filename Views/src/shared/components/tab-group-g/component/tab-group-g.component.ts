import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'tab-g',
  templateUrl: './tab-group-g.component.html',
  styleUrls: ['./tab-group-g.component.css']
})
export class TabGroupGComponent implements OnInit {

  @Input() titleTabs: string[] = [];
  @Input() entities: any[] = [];
  selected = new FormControl(0);



  constructor(

  ) {

  }
  test($event) {
    console.log($event._selectedIndex)
  }

  addTab(selectAfterAdding:boolean){

  }



  ngOnInit(): void {


  }

}
