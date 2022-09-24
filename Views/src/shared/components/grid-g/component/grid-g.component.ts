import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Tile } from '../interfaces/tile';

@Component({
  selector: 'grid-g',
  templateUrl: './grid-g.component.html',
  styleUrls: ['./grid-g.component.css']
})
export class GridGComponent implements OnInit, OnChanges {


  //Grid:
  @Input() numberGridCols: number;
  @Input() rowHeight: string | number;
  @Input() gridBackGroundColor: string | number;
  @Input() gridTextColor: string | number;

  //Tile
  @Input() tiles: Tile[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
     console.log(this.tiles)
  }

  ngOnInit(): void {}




}
