import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'grid-g',
  templateUrl: './grid-g.component.html',
  styleUrls: ['./grid-g.component.css']
})
export class GridGComponent implements OnInit {

  @Input() header: string[] = []
  @Input() entities: any[] = []
  @Output() search: string;
  @Output() formControlSearch = new FormControl();

  constructor() { }


  ngOnInit(): void {
  }

}
