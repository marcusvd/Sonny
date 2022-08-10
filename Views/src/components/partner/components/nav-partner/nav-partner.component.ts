import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-partner',
  templateUrl: './nav-partner.component.html',
  styleUrls: ['./nav-partner.component.css']
})
export class NavPartnerComponent implements OnInit {
  NavOrderServices
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
