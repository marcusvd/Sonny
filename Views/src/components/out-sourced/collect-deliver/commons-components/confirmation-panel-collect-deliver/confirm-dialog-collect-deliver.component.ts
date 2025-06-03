import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


import { AddDefaultImports, AddDefaultProviders } from '../../../../../components/imports/components-default.imports';
import { ItemsViewInterface } from '../../../../../shared/components/view-default/interfaces/items-view.interface';
import { IConfirmDialogCollectDeliver } from './interface/i-confirm-dialog-collect-deliver';
import { ViewDefaultComponent } from '../../../../../shared/components/view-default/view-default.component';
import { MatIconModule } from '@angular/material/icon';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';

@Component({
  selector: 'confirm-dialog-collect-deliver',
  templateUrl: 'confirm-dialog-collect-deliver.component.html',
  styleUrls: ['./confirm-dialog-collect-deliver.component.scss'],
  standalone: true,
  imports: [
    AddDefaultImports,
    MatDialogModule,
    MatIconModule,
    ViewDefaultComponent
  ],
  providers: [
    AddDefaultProviders
  ],
})


export class ConfirmDialogCollectDeliverComponent {
  itemsToView: ItemsViewInterface[] = [];

  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogCollectDeliverComponent>, @Inject(MAT_DIALOG_DATA) private data: IConfirmDialogCollectDeliver,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe
  ) {
    this.itemsToView.push({ key: 'Motivo', value: data.subject });
    this.itemsToView.push({ key: 'Preço', value: this._ptBrCurrencyPipe.transform(Number(data.price)) });
    this.itemsToView.push({ key: 'local', value: data.contact });
    this.itemsToView.push({ key: 'Coleta?', value: data.collect });
    this.itemsToView.push({ key: 'Entrega?', value: data.deliver });
    this.itemsToView.push({ key: 'cadastrado', value: data.other });
    this.itemsToView.push({ key: 'Serviço', value: data.itemsOrService });
    this.itemsToView.push({ key: 'Destino', value: data.destiny });
    this.itemsToView.push({ key: 'Transportador', value: data.transporter });
    this.itemsToView.push({ key: 'Cobrança', value: data.payer });
  }


  clickedYes() {
    this._dialogRef.close(true);
  }

  clickedNo() {
    this._dialogRef.close(false);
  }


}
