import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ClientDto } from '../../dto/client-dto';


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
