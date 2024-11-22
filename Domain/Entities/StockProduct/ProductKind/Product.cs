using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.StockProduct.ProductKind
{

    public class Product: RootBase
    {
        public string Name { get; set; }
        public List<Segment> Segments { get; set; }
        
        
    }
}