
// import { ConfirmDialogCollectDeliverComponent } from '../../../commons-components/confirmation-panel-collect-deliver/confirm-dialog-collect-deliver.component';
// import { BaseForm } from '../../../../../../shared/components/inheritance/forms/base-form';
// import { MatDialog } from '@angular/material/dialog';


// export class AddControlCollectDeliver extends BaseForm implements OnInit {

//   constructor(
//     private _dialog: MatDialog,
//   ) { super() }




//   openDialogConfirmationPanel(): void {

//     const dialogRef = this._dialog.open(ConfirmDialogCollectDeliverComponent, {
//       width: '750px',
//       height: '750px',
//       data: {
//         title: 'Tudo Certo?',
//         subject: this?.formMain?.get('subjectReason')?.value,
//         price: this?.formMain?.get('price')?.value,
//         contact: this?.formMain?.get('contactName')?.value,
//         collect: this?.formMain?.get('collect')?.value === true ? 'Sim' : 'Não',
//         deliver: this?.formMain?.get('deliver')?.value === true ? 'Sim' : 'Não',
//         other: this?.formMain?.get('other')?.value === true ? 'Sim' : 'Não',
//         itemsOrService: this?.formMain?.get('taskOverView')?.value,
//         destiny: this?.selectedCustomerDestiny?.name ?? this?.selectedPartnerDestiny?.name ?? (this?.destiny?.get('noRegisterName')?.value && this?.destiny?.get('noRegisterAddress')?.value),
//         transporter: this?.selectedTransporter?.name,
//         payer: this?.selectedCustomerPayment?.name ?? this?.selectedPartnerPayment?.name
//       },
//       autoFocus: true,
//       hasBackdrop: false,
//       disableClose: true,
//       panelClass: 'confirm-dialog-collect-deliver',
//     });

//     dialogRef.afterClosed().subscribe((result: any) => {
//       if (result)
//         this._createService.save(this.formMain);
//     })
//   }


// }
