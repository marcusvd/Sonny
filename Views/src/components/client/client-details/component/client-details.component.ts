import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tile } from 'src/shared/components/grid-g/interfaces/tile';
import { ClientDto } from '../../dto/client-dto';
// import { ClientDetailsService } from '../services/client-details-tree.service';

@Component({
  selector: 'client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
  providers:[]
})
export class ClientDetailsComponent implements OnInit, OnChanges {



  numberGridCols: number = 12;
  rowHeight: number | string = 100;
  gridBackGroundColor: string = 'transparent';
  gridTextColor: string = 'green';

  @Input() client: ClientDto;

  tiles: Tile[] = [];
  // constructor(private _clientDetailsService: ClientDetailsService) { }


  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    // this._clientDetailsService.loadByIdIncluded$(2).subscribe((client: ClientDto) => {
    //   this.client= client;
    //   console.log(client)
    // })
  }

}
