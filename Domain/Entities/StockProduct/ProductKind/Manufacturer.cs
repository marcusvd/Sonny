using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct.ProductKind
{
    public class Manufacturer: RootBase
    {
        public string Name { get; set; }
        public int SegmentId { get; set; }
        public Segment Segment { get; set; }
        public List<Product> Products { get; set; }
        public List<Model> Models { get; set; }

    }
}