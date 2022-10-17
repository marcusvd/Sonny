import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ContentChildren, OnInit, QueryList, VERSION, ViewChildren } from '@angular/core';
import { CardGContainerComponent } from './card-g-container.component';

@Component({
  selector: 'card-g',
  templateUrl: './card-g.component.html',
  styleUrls: ['./card-g.component.css']
})
export class CardGComponent implements OnInit {

  constructor(private cards: CardGContainerComponent) { }

  breakPoint: number;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';

  private _dataCard: any[] = [];
  private _card: any;

  get dataCard() {
    return this._card;
  }
  get dataSource() {
    return this._dataCard;
  }
  onResize($event: any) {
    this.breakPoint = ($event.target.innerWidth <= 400) ? 1 : 5;
  }

  ngOnInit(): void {
    this.breakPoint = (window.innerWidth <= 400) ? 1 : 5;
    this._card = this.cards.objAny;
    this._dataCard = this.cards.dataCards;
 }

}
