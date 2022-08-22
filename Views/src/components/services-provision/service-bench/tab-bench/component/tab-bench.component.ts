import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'tab-bench',
  templateUrl: './tab-bench.component.html',
  styleUrls: ['./tab-bench.component.css']
})
export class TabBenchComponent implements OnInit {

  @Input() tabs: string[] = [];
  @Input() entity: any;



  constructor(

    ) {

    }



  ngOnInit(): void {


  }

}
