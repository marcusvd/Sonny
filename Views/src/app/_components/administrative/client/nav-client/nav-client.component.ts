import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-client',
  templateUrl: './nav-client.component.html',
  styleUrls: ['./nav-client.component.css']
})
export class NavClientComponent implements OnInit {

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
