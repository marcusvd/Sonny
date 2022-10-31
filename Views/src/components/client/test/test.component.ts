import { Component, Input, OnInit } from '@angular/core';
import { ClientListService } from '../client-list/services/client-list.service';
import { ClientDto } from '../dto/client-dto';

@Component({
  selector: 'tests',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  numberGridCols: number = 12;
  rowHeight: number | string = '100%';
  gridBackGroundColor: string = 'transparent';
  gridTextColor: string = 'green';

  @Input() client: ClientDto;


  constructor(private _clientListService: ClientListService) { }

  ngOnInit() {
    // this.tiles.push({ backGroundColor: 'black', textColor: 'red', numberCols: 3, numberRows: 1, text: 'name' })
    // this._clientListService.loadByIdIncluded$(1).subscribe((client: ClientDto) => {
    //   this.client = client
    //  //   this.tiles.push({ backGroundColor: 'black', textColor: 'red', numberCols: 3, numberRows: 2, text: client.name })
    //   console.log(this.client)
    // })
    // this.tiles.push({ backGroundColor: 'white', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo1' })
    // this.tiles.push({ backGroundColor: 'black', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo2' })
    // this.tiles.push({ backGroundColor: 'Salmon', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo3' })
    // this.tiles.push({ backGroundColor: 'green', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo4' })
    // this.tiles.push({ backGroundColor: 'yellow', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo5' })
    // this.tiles.push({ backGroundColor: 'silver', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo6' })
    // this.tiles.push({ backGroundColor: 'purple', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo7' })
    // this.tiles.push({ backGroundColor: 'violet', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo8' })
    // this.tiles.push({ backGroundColor: 'green', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo9' })
    // this.tiles.push({ backGroundColor: 'pink', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo10' })
    // this.tiles.push({ backGroundColor: 'brown', textColor: 'red', numberCols: 1, numberRows: 1, text: 'Titulo11' })
    // this.tiles.push({ backGroundColor: 'orange', textColor: 'white', numberCols: 1, numberRows: 5, text: 'Titulo12' })

  }

}
