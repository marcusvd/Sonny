import { Directive, HostListener } from '@angular/core';
import { NavBackService } from 'src/shared/services/navigation/nav-back.service';

@Directive({
  selector: '[backButton]'
})
export class NavBackDirective {

  constructor(private navBack: NavBackService) { }

 @HostListener('click')
  onClick():void{
    this.navBack.back()
  }



}
