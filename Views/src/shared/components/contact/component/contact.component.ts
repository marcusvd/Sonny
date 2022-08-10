import { Component, Input, OnInit } from '@angular/core';
import { SocialNetworkDto } from 'src/shared/dtos/social-network-dto';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() _social: SocialNetworkDto;
  private _socialNets: SocialNetworkDto[] = [];
  constructor(
    public _CntValService: ContactService
  ) { }





  ngOnInit(): void {


  }

}
