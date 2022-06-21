import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-financial',
  templateUrl: './nav-financial.component.html',
  styleUrls: ['./nav-financial.component.css']
})
export class NavFinancialComponent implements OnInit {

  public openCloseOption: boolean;
  public _showType: boolean = false;
  public _showCard: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  showType() {
    this._showType = !this._showType;
    this._showCard = false;

  }
  showCard() {
    this._showCard = !this._showCard;
    this._showType = false;
  }
}
