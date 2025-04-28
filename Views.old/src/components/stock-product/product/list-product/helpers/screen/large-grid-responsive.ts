
import { TruncatePipe } from "src/shared/pipes/truncate.pipe";
import { ProductList } from "../../dto/product-list";
import { ex_haveSpace } from "../field-handle-help";


export const ex_makeItemsGridLager = (products: ProductList[], _truncatePipe: TruncatePipe) => {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`
  const soldPricestyleInsideCell = 'border:0.5px solid red; width: 100px;';

  const createdItems: ProductList[] = [];
  let items: ProductList = null;

  return products.map(x => {

    return {

      id: {
        key: x?.id?.key.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: iconStyle,
        styleCell: '',
        route: ''
      },

      productTypeView: {
        key: ex_haveSpace(x.productType?.key) ? x?.productType?.key : _truncatePipe.transform(x?.productType?.key, 15),
        icons: [''],
        button: x?.productType?.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      segmentView: {
        key: ex_haveSpace(x.segment?.key) ? x?.segment?.key : _truncatePipe.transform(x?.segment?.key, 10),
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      manufacturerView: {
        key: ex_haveSpace(x.manufacturer?.key) ? x?.manufacturer?.key : _truncatePipe.transform(x?.manufacturer?.key, 10),
        display: '',
        button: 'Menu',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      productType: {
        key: x?.productType?.key,
        icons: [''],
        button: x?.productType?.key,
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      segment: {
        key: x?.segment?.key,
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      manufacturer: {
        key: x?.manufacturer?.key,
        display: '',
        button: 'Menu',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      model: {
        key: ex_haveSpace(x.model?.key) ? x?.model?.key : _truncatePipe.transform(x?.model?.key, 10),
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      soldPrice: {
        key: x?.soldPrice?.key,
        icons: [''],
        styleInsideCell: soldPricestyleInsideCell,
        styleCell: 'text-align: center;',
        route: ''
      },

      isReservedByUser: {
        key: x?.isReservedByUser?.key ?? 'Não',
        icons: [''],
        styleInsideCell: '',
        styleCell: '',
        route: ''
      },

      quantity: {
        key: x?.quantity?.key.toString()
      },

      description: {
        key: ex_haveSpace(x.description?.key) ?_truncatePipe.transform(x?.description.key, 60) : _truncatePipe.transform(x?.description?.key, 30),
        icons: [''],
        styleInsideCell: 'text-align: center;',
        styleCell: 'flex: 3;',
        route: ''
      },

      isUsed: {
        key: x?.isUsed ? 'Sim' : 'Não'
      },
    }
  })


}
