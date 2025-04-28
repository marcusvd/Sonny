import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'sub-title-description',
  templateUrl: './sub-title-description.component.html',
  styleUrls: ['./sub-title-description.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})

export class SubTitleDescriptionComponent {

  @Input() title: string;
  @Input() icon: string;

  // @Input() plus: boolean = false;
  // // @Input() titleH1: boolean = false;
  // @Input() spaceItem: number = 100;

}
