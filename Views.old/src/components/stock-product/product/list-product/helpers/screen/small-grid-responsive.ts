
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ProductList } from "../../dto/product-list";
import { ex_haveSpace } from "../field-handle-help";

const entities: ProductList[] = [];

export const ex_makeItemsGridSmall = (productList: ProductList[], _truncatePipe: TruncatePipe) => {

  // const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  // const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  // const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left;`
  // const soldPricestyleInsideCell = 'border:0.5px solid red;'

  return productList.map(x => {

    return {
      id: { key: x?.id?.key.toString() },

      productTypeView: { key: _truncatePipe.transform(x?.productType.key, 14), icons: [''], button: x?.productType.key, styleInsideCell: '', styleCell: '', route: '' },

      segmentView: { key: _truncatePipe.transform(x?.segment.key, 10), icons: [''], styleInsideCell: '', styleCell: '', route: '' },

      manufacturerView: { key: _truncatePipe.transform(x?.manufacturer.key, 10), display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' },

      productType: { key: x?.productType.key },

      segment: { key: x?.segment.key },

      manufacturer: { key: x?.manufacturer.key },

      model: { key: x?.model.key },

      soldPrice: { key: x?.soldPrice.key },

      isReservedByUser: { key: x?.isReservedByUser?.key ?? 'Não' },

      quantity: { key: x?.quantity.key.toString() },

      description: {
        key: ex_haveSpace(x?.description.key) ? _truncatePipe.transform(x?.description.key, 60) : _truncatePipe.transform(x?.description.key, 14),
        icons: [''],
        styleInsideCell: 'text-align: center;',
        styleCell: (ex_haveSpace(x?.description.key)) ? ' wrap: break-word' : '' ,
        route: ''
      },
      isUsed: { key: x?.isUsed ? 'Sim' : 'Não' },
    }

  })

}
