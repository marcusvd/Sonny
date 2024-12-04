using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct.ProductKind
{
    public class Segment : RootBase
    {
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public List<Product> Products { get; set; }
        public List<Manufacturer> Manufacturers { get; set; }


    }
}