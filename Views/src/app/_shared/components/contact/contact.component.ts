import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';

import { ContactDto } from 'src/app/_shared/dtos/contact-dto';
import { SocialNetworkDto } from 'src/app/_shared/dtos/social-network-dto';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { environment } from 'src/environments/environment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ContactValidatorsService } from './services/contact-validators.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() _social: SocialNetworkDto;
  private _socialNets: SocialNetworkDto[] = [];
  constructor(
    public _CntValService: ContactValidatorsService
  ) { }





  ngOnInit(): void {


  }

}
