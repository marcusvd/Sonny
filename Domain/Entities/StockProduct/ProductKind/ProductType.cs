using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.StockProduct.ProductKind
{

    public class ProductType: RootBase
    {
        public string Name { get; set; }
        public List<Segment> Segments { get; set; }
        public List<Product> Products { get; set; }
        
        
    }
}