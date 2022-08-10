import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-order-services',
  templateUrl: './nav-order-services.component.html',
  styleUrls: ['./nav-order-services.component.css']
})
export class NavOrderServicesComponent implements OnInit {
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
