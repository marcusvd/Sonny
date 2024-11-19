using System.Collections.Generic;
using Domain.Entities.Shared;
using Domain.Entities.StockProduct.ProductKind;


namespace Domain.Entities.StockProduct
{
    public class Stock: RootBase
    {
        public ProductType Product { get; set; }
        public List<ItemProduct> ItemsProducts { get; set; }
       // public List<Sold> Solds { get; set; }
    }
}