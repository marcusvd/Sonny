import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ClientDto } from '../../../../dto/client-dto';
import { DevicesCrudService } from '../../../services/devices-crud.service';
import { NetworkDevicesDto } from '../../dto/network-devices-dto';


@Component({
  selector: 'app-devices-panel',
  templateUrl: './devices-panel.component.html',
  styleUrls: ['./devices-panel.component.css'],
  providers: []
})
export class DevicesPanelComponent implements OnInit {

  private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`


  public _devicesForm: FormGroup;
  IdRecoved: string = localStorage.getItem('idClient');
  public _clientArray: ClientDto[] = [];
  public _clientByid: ClientDto = new ClientDto();
  public _netDevsArray: NetworkDevicesDto[] = [];
  public _getNetDevsArray: NetworkDevicesDto[] = [];
  public _netDevs = new NetworkDevicesDto();





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ClientDto,
    public _Fb: FormBuilder,
    private _Crud: DevicesCrudService,
    // public _CliService: ClientService,
  ) { }




  devList(): string {
    return this._netDevsArray ? 'NENHUM DISPOSITIVO CADASTRADO!' : 'Not null';
  }



  save() {

    this._netDevs = Object.assign({}, this._devicesForm.value)
    this._netDevsArray.push(this._netDevs);


    this._clientByid.netWorkDevices = this._netDevsArray;

    this._Crud.update$(this._clientByid).subscribe();
  }


  getAllClients() {

    this._Crud.loadAll$().subscribe((_client: ClientDto[]) => {
      this._clientByid = _client.find(id => id.id == parseInt(this.IdRecoved));
      this._getNetDevsArray = this._clientByid.netWorkDevices;
      //    this._clientArray = _client;
      //console.log(this._clientByid);

    })

  }


  Validation() {
    return this._devicesForm = this._Fb.group({
      equipament: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      images: this._Fb.array([new FormControl()]),
      manufacturer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      model: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      user: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      physicalLocation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      password: ['', [Validators.maxLength(30)]],
      sn: ['', [Validators.minLength(2), Validators.maxLength(100)]],
      ip: ['', [Validators.minLength(7), Validators.maxLength(15)]],
      mac: ['', [Validators.minLength(12), Validators.maxLength(20)]],
      door: ['', [Validators.minLength(2), Validators.maxLength(10)]],
      apps: ['', [Validators.minLength(2), Validators.maxLength(100)]],
      connectivity: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      notes: ['', [Validators.minLength(2), Validators.maxLength(2000)]],
      //legacy: ['', []]
    })
  }


  ngOnInit(): void {
    this.Validation();
    this.getAllClients();
    this._clientByid = this._clientArray.find(id => id.id == parseInt(this.IdRecoved));
  }

}
