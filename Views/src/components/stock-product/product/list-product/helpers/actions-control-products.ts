import { MatDialog } from "@angular/material/dialog";
import { DetailedProductComponent } from "../../detailed-product/detailed-product.component";

export const ex_showDetails = (entity: any, _dialog: MatDialog) => {

    const dialogRef = _dialog.open(DetailedProductComponent, {
        width: 'auto',
        height: 'auto',
        data: entity,
        autoFocus: true,
        hasBackdrop: false,
        disableClose: true,
        panelClass: 'dialog-screen',

    });

    dialogRef.afterClosed().subscribe(result => {

        // if (result.id != null) {
        //     const deleteFake = this._customerServices.deleteFakeDisable(result.id);
        //     this.entities = this.entities.filter(y => y.id != result.id);

        //     this.entities$ = this.entities$.pipe(
        //         map(x => x.filter(y => y.id != result.id))
        //     )
        // }

    })
}