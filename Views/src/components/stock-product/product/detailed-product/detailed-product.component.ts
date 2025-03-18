import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { ProductDto } from '../dtos/product-dto';
import { ex_haveSpace } from '../list-product/helpers/field-handle-help';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ex_screen } from 'src/shared/helpers/useful/screen';
import { SubTitleDescriptionComponent } from 'src/shared/components/sub-title/description/sub-title-description.component';
import { AutoRowsDirectiveDirective } from 'src/shared/directivas/text-area/auto-rows-directive.directive';

@Component({
  selector: 'detailed-product',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    TitleComponent,
    SubTitleDescriptionComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    AutoRowsDirectiveDirective

  ],
  providers: [TruncatePipe],
  templateUrl: './detailed-product.component.html',
  styleUrls: ['./detailed-product.component.scss']
})
export class DetailedProductComponent implements OnInit {

  product!: ProductDto;
  event = { target: window } as unknown as Event;

  constructor(
    // private _dialogRef: MatDialogRef<DetailedProductComponent>, @Inject(MAT_DIALOG_DATA) public product: ProductDto,
    private _router: Router,
    private _truncatePipe: TruncatePipe,
  ) {

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;

      this.product = obj as ProductDto;
      console.log(this.product);
      // console.log(this.product);
      // console.log(this.product);
    }
  }


  // clickedYes(id: number, yes: string) {
  //   this._dialogRef.close({ id: id });
  // }
  // clickedNo(no: string) {
  //   this._dialogRef.close(no);
  // }
  cssSubTitle = '';

  // widthSubTitleScreen =() => {
  //   SmallScreen = 'max-width: 532px;'
  // }



  productTemplate: any

  objectHandle = (product: ProductDto, _truncatePipe: TruncatePipe) => {
    return Object.assign(product, {
      productType: product.productType,
      segment: product.segment,
      manufacturer: product.manufacturer,
      model: product.model,
      quantity: product.quantity,
      specificities: product.specificities,
      description: ex_haveSpace(product.specificities.description) ? product.specificities.description : _truncatePipe.transform(product.specificities.description, 10),
      detailedDescription: ex_haveSpace(product.specificities.detailedDescription) ? product.specificities.detailedDescription : _truncatePipe.transform(product.specificities.detailedDescription, 10),
      supplier: product.supplier,
      usedHistoricalOrSupplier: product.usedHistoricalOrSupplier,
      purchaseInvoiceNumber: product.purchaseInvoiceNumber,
      costPrice: product.costPrice,
      soldPrice: product.soldPrice,
      entryDate: product.entryDate,
      soldDate: product.soldDate,
      warrantyEnd: product.warrantyEnd,
      warrantyEndLocal: product.warrantyEndLocal,
      isUsed: product.isUsed,
      isTested: product.isTested,
    })
  }

  rows: number = 0;
  calcRows(value: string) {
    console.log(this.rows = value.length / 80)
    return this.rows = value.length / 80;
  }

  ngOnInit(): void {
    this.productTemplate = this.objectHandle(this.product, this._truncatePipe)

    console.log(this.productTemplate.specificities.description)
    console.log(this.productTemplate.specificities.detailedDescription)
  }

}
