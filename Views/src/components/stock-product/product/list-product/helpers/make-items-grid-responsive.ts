
import { ItemsInterface } from "src/shared/components/list-g/list/interfaces/items-interface"
import { ProductList } from "../dto/product-list"
import { TruncatePipe } from "src/shared/pipes/truncate.pipe"

// export function makeItemsGridSmall(x: ProductList[]) {

//   const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
//   const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
//   const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left;`
//   const soldPricestyleInsideCell = 'border:0.5px solid red;'

//   const createdItems: ProductList[] = [];
//   let items: ProductList = null;

//   x.forEach(x => {

//     items = new ProductList();

//     items.productType = { key: x?.productType.key, display: 'menu', icons: [''], button: x?.productType.key, styleInsideCell: buttonStyle, route: '' };

//     items.manufacturer = { key: x?.manufacturer.key, display: 'menu', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };

//     items.soldPrice = { key: x?.soldPrice.key,display: 'menu', icons: [''], styleInsideCell: soldPricestyleInsideCell, route: '' };

//     createdItems.push(items);
//   })


//   return createdItems;
// }



export function makeItemsGridSmall(x: ProductList[]) {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px; float:left;`
  const soldPricestyleInsideCell = 'border:0.5px solid red;'

  const createdItems: ProductList[] = [];
  let items: ProductList = null;

  x.forEach(x => {
    items = new ProductList();
    items.id = { key: x?.id.toString() };
    // items.productType = { key: x?.productType.key, icons: [''], button: x?.productType.key, styleInsideCell: buttonStyle, display: 'button', route: '' };
    items.productTypeView = { key: x?.productType.key };

    items.segmentView = { key: x?.segment.key };

    items.manufacturerView = { key: x?.manufacturer.key };
    
    items.productType = { key: x?.productType.key };

    items.segment = { key: x?.segment.key };

    items.manufacturer = { key: x?.manufacturer.key };

    items.model = { key: x?.model.key };

    items.soldPrice = { key: x?.soldPrice.key };

    items.isReservedByUser = { key: x?.isReservedByUser?.key ?? 'Não' };

    items.quantity = { key: x?.quantity.key.toString() };
    // items.quantity = isTested(x?.quantity.key)

    items.isUsed = { key: x?.isUsed ? 'Sim' : 'Não' };

    createdItems.push(items);
  })


  return createdItems;

}

export function makeItemsGridLager(x: ProductList[], _truncatePipe: TruncatePipe,) {

  const buttonStyle = `background-color:rgb(43, 161, 168);border:none; color:white; height: 20px;  display: flex;  justify-content: center;   align-items: center;   padding: 0 12px; width: 100px; max-width: 100px;`
  const buttonCellStyle = `display: flex; justify-content: center; align-items: center;`
  const iconStyle = `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`
  const soldPricestyleInsideCell = 'border:0.5px solid red; width: 100px;';

  const createdItems: ProductList[] = [];
  let items: ProductList = null;

  x.forEach(x => {
    items = new ProductList();

    items.id = { key: x?.id.toString(), display: 'icons', icons: ['list', 'edit', 'home'], styleInsideCell: iconStyle, styleCell: '', route: '' };
    // items.productType = { key: x?.productType.key, icons: [''], button: x?.productType.key, styleInsideCell: buttonStyle, display: 'button', route: '' };
    items.productTypeView = { key: _truncatePipe.transform(x?.productType.key, 10), icons: [''], button: x?.productType.key, styleInsideCell: '', styleCell: '', route: '' };

    items.segmentView = { key: _truncatePipe.transform(x?.segment.key, 10), icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.manufacturerView = { key: _truncatePipe.transform(x?.manufacturer.key, 10), display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };
    // items.productTypeView = { key: x?.productType.key, icons: [''], button: x?.productType.key, styleInsideCell: '', styleCell: '', route: '' };

    // items.segmentView = { key: x?.segment.key, icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    // items.manufacturerView = { key: x?.manufacturer.key, display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };



  
    items.productType = { key: x?.productType.key, icons: [''], button: x?.productType.key, styleInsideCell: '', styleCell: '', route: '' };

    items.segment = { key: x?.segment.key, icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.manufacturer = { key: x?.manufacturer.key, display: '', button: 'Menu', icons: [''], styleInsideCell: '', styleCell: '', route: '' };



    items.model = { key: x?.model.key, icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.soldPrice = { key: x?.soldPrice.key, icons: [''], styleInsideCell: soldPricestyleInsideCell, styleCell: 'text-align: center;', route: '' };

    items.isReservedByUser = { key: x?.isReservedByUser?.key ?? 'Não', icons: [''], styleInsideCell: '', styleCell: '', route: '' };

    items.quantity = { key: x?.quantity.key.toString() };
    items.description = { key: x?.description.key, icons: [''], styleInsideCell: 'text-align: center;', styleCell: 'flex: 3;', route: '' };

    items.isUsed = { key: x?.isUsed ? 'Sim' : 'Não' };

    createdItems.push(items);
  })


  return createdItems;

}


export function isTested(value: string) {
  const iconStyleTested = `color:rgb(43, 161, 168);`
  const iconStyleNotTested = `color:red;`;

  const notTested = 'clear';
  const tested = 'check';

  const objReturn: ItemsInterface = { key: value.toString(), display: 'icons', icons: [''], styleInsideCell: '', route: '' };

  const isTested = new Date(value).getFullYear();

  if (isTested <= 1) {
    objReturn.icons.push(notTested);
    objReturn.styleInsideCell = iconStyleNotTested;
  }
  else {
    objReturn.icons.push(tested);
    objReturn.styleInsideCell = iconStyleTested;
  }

  return objReturn;

}
