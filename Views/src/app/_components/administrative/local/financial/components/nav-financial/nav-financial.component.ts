import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-financial',
  templateUrl: './nav-financial.component.html',
  styleUrls: ['./nav-financial.component.css']
})
export class NavFinancialComponent implements OnInit {

  public openCloseOption: boolean;
  constructor() { }

  ngOnInit(): void {
  }


  toshow(bool: boolean) {
    if (bool) {
      this.openCloseOption = bool;
    }
    this.openCloseOption = bool;
  }
}
