
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ProductList } from "../../dto/product-list";
import { ex_haveSpace } from "../field-handle-help";



export const ex_makeItemsGridMedium = (products: ProductList[], _truncatePipe: TruncatePipe): ProductList[] => {

  

  return products.map(x => {

    return {

      id: {
        key: x?.id?.key.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: '',
        route: ''
      },

      productTypeView: {
        key: ex_haveSpace(x.productType.key) ? x?.productType.key : _truncatePipe.transform(x?.productType.key, 10),
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: ex_haveSpace(x.productType.key) ? ' wrap: break-word' : '',
        route: ''
      },

      productType: {
        key: x?.productType.key,
        icons: [''],
        button: x?.productType.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      soldPrice: {
        key: x?.soldPrice.key,
        icons: [''],
        styleInsideCell: 'border:0.5px solid red; width: 100px;',
        styleCell: 'text-align: center;',
        route: ''
      },

      description: {
        key: ex_haveSpace(x.description.key) ? _truncatePipe.transform(x?.description.key, 60) : _truncatePipe.transform(x?.description.key, 20),
        icons: [''],
        styleInsideCell: 'text-align: center;',
        styleCell: 'flex: 3;' + (ex_haveSpace(x.description.key) ? ' wrap: break-word' : ''),
        route: ''
      },
    }
  })
}

