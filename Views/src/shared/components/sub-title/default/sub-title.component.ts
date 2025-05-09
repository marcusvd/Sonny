import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'sub-title',
  templateUrl: './sub-title.component.html',
  styleUrls: ['./sub-title.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})

export class SubTitleComponent {

  @Input() title: string;
  @Input() icon: string;


  @Input() titleStyle: string;
   @Input() styleContainerTitle: string;

  @Input() titleBarStyle: string = `
  max-width: calc(100vw - 10%);
  background-color: rgb(43, 161, 168);
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  height:35px;
  margin-top:-35px;
  `;
  // top:18px
  // @Input() plus: boolean = false;
  // // @Input() titleH1: boolean = false;
  // @Input() spaceItem: number = 100;

}
