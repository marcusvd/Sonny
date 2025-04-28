import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { IRadios } from '../interfaces/Iradios';
import { IRadiosDictionary } from '../interfaces/Iradios-dictionary';
import { MatLegacyRadioButton as MatRadioButton } from '@angular/material/legacy-radio';
import { FormBuilder } from '@angular/forms';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';

@Component({
    selector: 'radio-button',
    template: `
   <mat-radio-group   (window:resize)="screen()"   [(ngModel)]="selectedStart"  (change)="onChangeRadioChoice($event.value)">
   <div  *ngFor="let radio of this.entities | keyvalue">
     <div >
     <mat-radio-button #radioButton value={{radio.value}} >
                    {{radio.key | radioOptionDisplayNameHandle}}
      </mat-radio-button>
     </div>
   </div>
  </mat-radio-group>

  `,
    styles: [`
tr:hover  {
  background-color:yellow;
}
  `],
    standalone: false
})
export class RadioButtonGComponent extends BaseForm implements OnChanges, OnInit {

  @Input() position: string = 'horizontal';
  @Input() entities: IRadiosDictionary<string>;

  @Output() selected = new EventEmitter<string>();
  @Input() selectedStart: string;
  // @Input() selectedStart: string = 'customer'

  @ViewChild('radioButton') radioButton: MatRadioButton;

  positionHtmlColumn = 'row';
  positionHtmlRow = 'column';

  screenFieldPosition: string = 'row';

  constructor(private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }


  @Input() set markAs(flag: string) {
    if (flag) {
      this.radioButton.value = flag
      this.radioButton.checked = true;
      this.onChangeRadioChoice(flag);
    }

  }
  // @Input() set markAsCustomer(flag: boolean) {
  //   if (flag) {
  //     this.radioButton.value = 'customer'
  //     this.radioButton.checked = true;
  //     this.onChangeRadioChoice('customer');
  //   }

  // }

  onChangeRadioChoice(event: string) {
    if(event) this.selected?.emit(event);
  }

  setValueUpdate(control?: string, value?: string): void {
    this.formMain.get(control).setValue(value);
  }

  positionManager() {

    if (this.position == 'vertical') {

      this.positionHtmlColumn = 'column';
      this.positionHtmlRow = 'row';

    }
  }




  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.positionHtmlColumn = 'column';
            this.positionHtmlRow = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }




  ngOnChanges(): void {
    //this.positionManager();

  }

  ngOnInit(): void {
    this.screen();
  }




}
