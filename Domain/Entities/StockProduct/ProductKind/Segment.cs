using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct.ProductKind
{
    public class Segment : RootBase
    {
        public string Name { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public List<Manufacturer> Manufacturers { get; set; }


    }
}